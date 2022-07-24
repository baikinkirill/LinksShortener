import { NextApiResponse } from 'next'
import { DbWorker } from '../../services/dbWorker'
import { Request } from '../../types/Request'

let currentTime: any

const DAYS_COUNT = 7

async function getLastWeek (
  worker: DbWorker,
  tableMap: any,
  params: any,
  days = DAYS_COUNT
) {
  const data = await worker
    .getSession()
    .query(tableMap)
    .where(
      tableMap.hash
        .Equal(params.slug[1])
        .And()
        .date.MoreEqual(timePagination(24 * days)[1])
        .And()
        .date.LessEqual(timePagination(0)[0])
    )
    .then((result: any) => ({
      result
    }))

  const result: any = {}
  for (let i = 0; i < 24 * days; i++) {
    const pag = timePagination(i)
    result[pag[0]] = Array.from(data.result).filter(
      (e: any) => e.date <= pag[0] && e.date > pag[1]
    ).length
  }

  const dataR: Request[] = data.result
  const browsers: any = {}
  for (const r of Array.from(dataR)) {
    const br: string = r.browser + ''
    if (Object.keys(browsers).includes(br)) browsers[br] = browsers[br] + 1
    else browsers[br] = 1
  }

  return [result, browsers]
}

export async function getStats (params: any, res: NextApiResponse) {
  const worker = new DbWorker()
  const tableMap = worker.getRequestsMap()
  const linksTable = worker.getTableMap()
  const resultLastWeek = await getLastWeek(worker, tableMap, params)
  const resultLastDay = await getLastWeek(worker, tableMap, params, 1)

  const query: any[] = await worker
    .getSession()
    .query(linksTable)
    .where(linksTable.hash.Equal(params.slug[1]))

  if (Array.from(query).length === 0) {
    res.status(404).json({ error: 'Hash not found' })
    return
  }
  res.status(200).json({
    result: {
      link: Array.from(query)[0].link,
      lastWeek: { stat: resultLastWeek[0], browsers: resultLastWeek[1] },
      lastDay: { stat: resultLastDay[0], browsers: resultLastDay[1] }
    }
  })
}

function timePagination (i: number) {
  if (!currentTime) currentTime = Math.ceil(new Date().getTime() / 1000)

  return [currentTime - i * 3600, currentTime - (i + 1) * 3600]
}
