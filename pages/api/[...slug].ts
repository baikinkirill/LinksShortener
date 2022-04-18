import type { NextApiRequest, NextApiResponse } from 'next';
import { linkObject } from '../../types/linkObject';
import { dbWorker } from '../../services/dbWorker';
import { Request } from '../../types/Request';
const requestIp = require('request-ip');
const useragent = require('useragent');
const UAParser = require('ua-parser-js');

export const config = {
 api: {
  bodyParser: {
   sizeLimit: '500kb',
  },
 },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
 let func = Switch(
  req.query.slug.length > 0 ? req.query.slug[0] : '',
  req.method
 );

 let params = req.query;
 if (req.headers['content-type'] === 'application/json') {
  params = { ...req.query, ...req.body };
 }
 params['ip'] = requestIp.getClientIp(req);
 func(params, res);
}

function Switch(methodName: string, methodType: any): any {
 switch (methodName.toLowerCase() + '__' + methodType.toLowerCase()) {
  case 'hash__get':
   return findHash;
   break;
  case 'hash__post':
   return addHash;
   break;
  default:
   return notFound;
   break;
 }
}

function findHash(params: any, res: NextApiResponse) {
 if (params.slug.length < 2) {
  res.status(404).json({ error: 'Hash not found' });
  return;
 }

 let worker = new dbWorker();
 let tableMap = worker.getTableMap();

 var query = worker
  .getSession()
  .query(tableMap)
  .where(tableMap.hash.Equal(params.slug[1]));

 query.then((e: any) => {
  if (e.length > 0) {
   let requestObj: Request = {
    hash: e[0].link,
    date: Math.ceil(new Date().getTime() / 1000),
    ip: params.ip,
    browser: params.browser,
    os: params.os,
   };

   console.log(requestObj);
   worker.getRequestsMap().Insert(requestObj);
   res.status(200).json({ result: e[0].link });
  } else {
   res.status(404).json({ error: 'Hash not found' });
  }
 });
}

function addHash(params: any, res: NextApiResponse) {
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

function notFound(params: any, res: NextApiResponse) {
 res.status(404).json({ error: 'Method not found' });
}
