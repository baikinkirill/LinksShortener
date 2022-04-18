import { Button, Card, Input } from 'antd';
import styles from './MainPage.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { QRCodeCanvas } from 'qrcode.react';
import { useState } from 'react';
import shortLink from '../../services/shortLink';

export default function MainPage() {
 const initState: any = { link: '' };

 const [state, editState] = useState(initState);
 const setState = (e: object) => {
  editState((prevState: any) => ({ ...prevState, ...e }));
 };

 const buttonClick = async () => {
  setState({ loading: true });
  let link = await shortLink(state.link);
  setState({
   loading: false,
   qr: <QRCodeCanvas value={process.env.NEXT_PUBLIC_HOST + '/' + link} />,
  });
  return true;
 };

 return (
  <div className={[styles.parent].join(' ')}>
   <div>
    <h1>trpp.ru</h1>
   </div>
   <div className={styles.contentParent}>
    <Card>
     <div className={styles.content}>
      <Input
       onChange={(e) => {
        setState({ link: e.target.value.replace(/(http(s)?\:\/\/)/gim, '') });
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
   {state.qr}
  </div>
 );
}
