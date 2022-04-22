import { NextApiResponse } from 'next';
import { dbWorker } from '../../services/dbWorker';
import { Request } from '../../types/Request';

let currentTime: any = undefined;

const DAYS_COUNT = 7;

async function getLastWeek(
 worker: dbWorker,
 tableMap: any,
 params: any,
 days = DAYS_COUNT
) {
 let data = await worker
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
   result: result,
  }));

 let result: any = {};
 for (let i = 0; i < 24 * days; i++) {
  let pag = timePagination(i);
  result[pag[0]] = Array.from(data.result).filter(
   (e: any) => e.date <= pag[0] && e.date > pag[1]
  ).length;
 }

 let dataR: Request[] = data.result;
 let browsers: any = {};
 for (let r of Array.from(dataR)) {
  let br: string = r.browser + '';
  if (Object.keys(browsers).includes(br)) browsers[br] = browsers[br] + 1;
  else browsers[br] = 1;
 }

 return [result, browsers];
}

export async function getStats(params: any, res: NextApiResponse) {
 let worker = new dbWorker();
 let tableMap = worker.getRequestsMap();
 let linksTable = worker.getTableMap();
 let resultLastWeek = await getLastWeek(worker, tableMap, params);
 let resultLastDay = await getLastWeek(worker, tableMap, params, 1);

 var query: any[] = await worker
  .getSession()
  .query(linksTable)
  .where(linksTable.hash.Equal(params.slug[1]));

 console.log(Array.from(query));
 res.status(200).json({
  result: {
   link: Array.from(query)[0].link,
   lastWeek: { stat: resultLastWeek[0], browsers: resultLastWeek[1] },
   lastDay: { stat: resultLastDay[0], browsers: resultLastDay[1] },
  },
 });
}

function timePagination(i: number) {
 if (!currentTime) currentTime = Math.ceil(new Date().getTime() / 1000);

 return [currentTime - i * 3600, currentTime - (i + 1) * 3600];
}
