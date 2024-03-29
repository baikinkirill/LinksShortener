import { NextApiResponse } from 'next';
import { DbWorker } from '../../services/dbWorker';
import { Request } from '../../types/Request';

export function findHash (params: any, res: NextApiResponse) {
  if (params.slug.length < 2) {
    res.status(404).json({ error: 'Hash not found' });
    return;
  }

  const worker = new DbWorker();
  const tableMap = worker.getTableMap();

  const query = worker
    .getSession()
    .query(tableMap)
    .where(tableMap.hash.Equal(params.slug[1]));

  query.then(async (e: any) => {
    if (e.length > 0) {
      const requestObj: Request = {
        hash: params.slug[1],
        date: Math.ceil(new Date().getTime() / 1000),
        ip: params.ip,
        browser: params.browser,
        os: params.os
      };

      await worker.getRequestsMap().Insert(requestObj);
      res.status(200).json({ result: e[0].link });
    } else {
      res.status(404).json({ error: 'Hash not found' });
    }
  });
}
