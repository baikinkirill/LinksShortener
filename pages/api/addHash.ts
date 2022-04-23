import { NextApiResponse } from 'next';
import { dbWorker } from '../../services/dbWorker';
import { linkObject } from '../../types/linkObject';

export function addHash(params: any, res: NextApiResponse) {
 if (params.slug.length < 1) {
  res.status(404).json({ error: 'Hash not found' });
  return;
 }
 var md5 = require('md5');

 const LINK = params.body.toLowerCase();
 const LINK_HASH = md5(LINK).slice(0, 7);

 let worker = new dbWorker();
 let tableMap = worker.getTableMap();

 var query = worker
  .getSession()
  .query(tableMap)
  .where(tableMap.hash.Equal(LINK_HASH));

 let linkObj: linkObject = {
  link: LINK,
  hash: LINK_HASH,
 };

 query.then(async (e: any) => {
  if (e.length > 0) {
   res.status(201).json({ result: LINK_HASH });
  } else {
   await tableMap.Insert(linkObj);
   res.status(201).json({ result: LINK_HASH });
  }
 });
}
