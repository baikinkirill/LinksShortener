import { NextApiResponse } from 'next';
import { dbWorker } from '../../services/dbWorker';
import { Request } from '../../types/Request';

export function getStats(params: any, res: NextApiResponse) {
 let worker = new dbWorker();
 let tableMap = worker.getRequestsMap();
 console.log(params.slug[1], 'ff');

 var query = worker
  .getSession()
  .query(tableMap)
  .where(tableMap.hash.Equal(params.slug[1]));

 query.then((result: Request[]) => {
  res.status(200).json({ result: Array.from(result) });
 });
}
