import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import MainPage from '../components/mainPage/MainPage';
import getUserInfo from '../services/getUserInfo';
import { UserInfo } from '../types/UserInfo';

const Home: NextPage = (UserInfo: any) => {
 return (
  <div>
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
