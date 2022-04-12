import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import MainPage from '../components/mainPage/MainPage';

const Home: NextPage = () => {
 return (
  <div>
   <MainPage />
  </div>
 );
};

export default Home;
