import { NextApiResponse } from 'next';
import { dbWorker } from '../../services/dbWorker';
import { linkObject } from '../../types/linkObject';

export function addHash(params: any, res: NextApiResponse) {
 if (params.slug.length < 2) {
  res.status(404).json({ error: 'Hash not found' });
  return;
 }
 var md5 = require('md5');
 let worker = new dbWorker();
 let tableMap = worker.getTableMap();
 let linkObj: linkObject = {
  link: params.slug[1],
  hash: md5(params.slug[1]).slice(0, 7),
 };

 tableMap.Insert(linkObj);
 res.status(201).json({ result: md5(params.slug[1]).slice(0, 7) });
}