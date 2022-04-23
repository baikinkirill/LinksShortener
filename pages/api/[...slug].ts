import type { NextApiRequest, NextApiResponse } from 'next';
import { findHash } from './getHash';
import { addHash } from './addHash';
import { getStats } from './getStats';

const requestIp = require('request-ip');

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
 } else {
  params = { ...req.query, body: req.body };
 }

 params['ip'] = requestIp.getClientIp(req);
 func(params, res);
}

function Switch(methodName: string, methodType: any): any {
 console.log(methodName);
 switch (methodName.toLowerCase() + '__' + methodType.toLowerCase()) {
  case 'hash__get':
   return findHash;
   break;
  case 'hash__post':
   return addHash;
   break;
  case 'stats__get':
   return getStats;
   break;
  default:
   return notFound;
   break;
 }
}

function notFound(params: any, res: NextApiResponse) {
 res.status(404).json({ error: 'Method not found' });
}
