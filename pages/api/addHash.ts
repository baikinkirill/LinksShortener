import { NextApiResponse } from 'next'
import { DbWorker } from '../../services/dbWorker'
import { linkObject } from '../../types/linkObject'

export function addHash (params: any, res: NextApiResponse) {
  if (params.slug.length < 1) {
    res.status(404).json({ error: 'Hash not found' })
    return
  }
  const md5 = require('md5')

  const LINK = params.body || ''
  const LINK_HASH = md5(LINK).slice(0, 7)

  const worker = new DbWorker()
  const tableMap = worker.getTableMap()

  const query = worker
    .getSession()
    .query(tableMap)
    .where(tableMap.hash.Equal(LINK_HASH))

  const linkObj: linkObject = {
    link: LINK,
    hash: LINK_HASH
  }

  query.then(async (e: any) => {
    if (e.length > 0) {
      res.status(201).json({ result: LINK_HASH })
    } else {
      await tableMap.Insert(linkObj)
      res.status(201).json({ result: LINK_HASH })
    }
  })
}
