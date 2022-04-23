import { json } from 'stream/consumers';
import { UserInfo } from '../types/UserInfo';
import getUserInfo from '../services/getUserInfo';
import { useEffect } from 'react';

export default function Id(props: any) {
 return (
  <div>
   <h1>Ща пущу...</h1>
  </div>
 );
}

export async function getServerSideProps(req: any) {
 const userInfo: UserInfo = getUserInfo(req.req);
 const HOST_URL = process.env.host_url || req.req.headers.host;

 let response = await fetch(
  'http://' +
   HOST_URL +
   '/api/hash/' +
   req.params.id +
   '/?os=' +
   userInfo.os +
   '&browser=' +
   userInfo.browser
 );
 if (response.ok) {
  let json = await response.json();

  return {
   redirect: {
    destination: 'https://' + json.result,
    permanent: true,
   },
  };
 } else {
  return { notFound: true };
 }
}
