import { Button, Card, Input } from 'antd';
import styles from './MainPage.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import shortLink from '../../services/shortLink';
import { test } from '../../types/global';

export default function MainPage() {
 const initState: any = { link: '' };
 let test: test;
 const [loaded, setLoaded] = useState(false);
 const [state, editState] = useState(initState);
 const setState = (e: object) => {
  editState((prevState: any) => ({ ...prevState, ...e }));
 };

 const buttonClick = async () => {
  setState({ loading: true });
  shortLink(state.link).then((result) => {
   setLoaded(true);
   setState({
    loading: false,
    linkResult: result,
    qr: (
     <QRCodeCanvas
      size={200}
      value={process.env.NEXT_PUBLIC_HOST + '/' + result}
     />
    ),
   });
  });
 };

 return (
  <div className={[styles.parent].join(' ')} loaded={loaded + ''}>
   <div>
    <h1>trpp.ru</h1>
   </div>
   <div className={styles.contentParent}>
    <Card>
     <div className={styles.content}>
      <Input
       onChange={(e) => {
        let newValue = e.target.value.replace(/(http(s)?\:\/\/)/gim, '');
        setLoaded(false);
        setState({
         link: newValue,
        });
       }}
       prefix="https://"
       size={'large'}
       value={state.link}
       placeholder={'Enter your link here'}
      />
      {state.loading ? (
       <Button
        shape="round"
        size={'large'}
        type={'primary'}
        icon={<LoadingOutlined />}></Button>
      ) : (
       <Button
        onClick={buttonClick}
        shape="round"
        size={'large'}
        type={'primary'}>
        Short it!
       </Button>
      )}
     </div>
    </Card>
   </div>
   <div className={styles.result}>
    <div className={styles.resultContent}>
     <h1>done</h1>
     {state.qr}
     <a
      href={`https://trpp.ru/${state.linkResult}`}
      target={'_blank'}
      rel="noreferrer">
      trpp.ru/{state.linkResult}
     </a>
     <div className={styles.statsLink}>
      <span>
       <b>Statistics: </b>
      </span>
      <a
       href={`https://trpp.ru/stats/${state.linkResult}`}
       target={'_blank'}
       rel="noreferrer">
       trpp.ru/stats/{state.linkResult}
      </a>
     </div>
    </div>
   </div>
  </div>
 );
}
