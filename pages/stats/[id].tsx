import dynamic from 'next/dynamic';
import styles from './stats.module.scss';
import { DefaultHeader } from '../index';
import React, { Fragment } from 'react';

const Line = dynamic(
  () => import('@ant-design/plots/lib/components/line/index'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);
const Pie = dynamic(
  () => import('@ant-design/plots/lib/components/pie/index'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>
  }
);

function LineParent (props: any) {
  const data = Object.keys(props.result.stat).map((e) => ({
    Date: props.toTime
      ? new Date(Number(e) * 1000).toLocaleTimeString('ru')
      : new Date(Number(e) * 1000).toLocaleDateString('ru'),
    Views: props.result.stat[e]
  }));

  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'Views',
    xAxis: {
      // type: 'timeCat',
    },
    smooth: true
  };

  // @ts-ignore
  return (<div><Line {...config} /></div>);
}

function PieParent (props: any) {
  const data = Object.keys(props.result.browsers).map((e) => ({
    type: e,
    value: props.result.browsers[e]
  }));
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}'
    },
    interactions: [
      {
        type: 'pie-legend-active'
      },
      {
        type: 'element-active'
      }
    ]
  };
  return <Pie {...config} />;
}

export default function Stats (props: any) {
  console.log(props);
  return (
  <div className={styles.parent}>
   <DefaultHeader />
   <h1>{decodeURIComponent(props.result.link)}</h1>
   <div className={styles.content}>
    {Object.keys(props.result.lastWeek.browsers).length === 0
      ? (
      <h2 style={{ textAlign: 'center', marginTop: '20vh' }}>
       Статистика появится чуть позже
      </h2>
        )
      : (
      <Fragment>
       <h2>За последние 7 дней</h2>
       <div className={styles.chartParent}>
        <div>
         <LineParent result={props.result.lastWeek} toTime={false} />
        </div>
        <div>
         <PieParent result={props.result.lastWeek} />
        </div>
       </div>
       <h2>За последние 24 часа</h2>
       <div className={styles.chartParent}>
        <div>
         <LineParent result={props.result.lastDay} toTime={true} />
        </div>
        <div>
         <PieParent result={props.result.lastDay} />
        </div>
       </div>
      </Fragment>
        )}
   </div>
  </div>
  );
}

export async function getServerSideProps (req: any) {
  const HOST_URL = process.env.host_url || req.req.headers.host;
  const response = await fetch(
    'http://' + HOST_URL + '/api/stats/' + req.query.id
  );
  if (response.ok) {
    const json = await response.json();
    if (json.result) {
      const res = json.result;
      return {
        props: {
          result: res
        }
      };
    } else {
      return {
        notFound: true
      };
    }
  }

  return {
    notFound: true
  };
}
