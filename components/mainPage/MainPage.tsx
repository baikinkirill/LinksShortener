import { Button, Card, Input } from 'antd';
import styles from './MainPage.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

export default function MainPage() {
 const initState: any = {};

 const [state, editState] = useState(initState);
 const setState = (e: object) => {
  editState((prevState: any) => ({ ...prevState, ...e }));
 };

 return (
  <div className={styles.parent}>
   <div>
    <h1>Какой-то текст</h1>
   </div>
   <div className={styles.contentParent}>
    <Card>
     <div className={styles.content}>
      <Input
       prefix="https://"
       size={'large'}
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
        onClick={() => setState({ loading: true })}
        shape="round"
        size={'large'}
        type={'primary'}>
        Short it!
       </Button>
      )}
     </div>
    </Card>
   </div>
   <QRCodeCanvas value="https://reactjs.org/" />
  </div>
 );
}
