import type { NextPage } from 'next';
import Head from 'next/head';
import MainPage from '../components/mainPage/MainPage';
import getUserInfo from '../services/getUserInfo';

export function DefaultHeader() {
 const HOST_URL = process.env.host_url || window.location.host;

 return (
  <Head>
   <title>{HOST_URL.toUpperCase()}</title>
   <meta name="Лучший сокращатель ссылок для веб-сайта" />
   <link rel="icon" href="./favicon.ico" type="image/x-icon" />
   <meta property="og:image" content="./cover.png" />
  </Head>
 );
}

const Home: NextPage = (UserInfo: any) => {
 return (
  <div>
   <DefaultHeader />
   <MainPage />
  </div>
 );
};

export default Home;

export function getServerSideProps(req: any) {
 return {
  props: {
   userInfo: getUserInfo(req.req),
  },
 };
}
