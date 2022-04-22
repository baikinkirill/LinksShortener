import dynamic from 'next/dynamic';

const Line = dynamic(
 () => import('@ant-design/plots/lib/components/line/index'),
 {
  ssr: false,
  loading: () => <p>Loading...</p>,
 }
);

function LineParent(props) {
 console.log(props.result);
 let data = props.result.map((e) => ({
  Date: new Date(e.date * 1000).toLocaleTimeString('ru'),
  scales: 15,
 }));

 const config = {
  data,
  padding: 'auto',
  xField: 'Date',
  yField: 'scales',
  xAxis: {
   // type: 'timeCat',
   tickCount: 5,
  },
  smooth: true,
 };

 return (
  <div>
   <Line {...config} />
  </div>
 );
}

export default function Stats(props) {
 return (
  <div>
   <div>
    <LineParent result={props.result} />
   </div>
  </div>
 );
}

export async function getServerSideProps(req) {
 let response = await fetch(
  'http://' + req.req.headers.host + '/api/stats/' + req.query.id
 );
 if (response.ok) {
  let json = await response.json();
  if (json.result) {
   let res = json.result;
   return {
    props: {
     result: res,
    },
   };
  } else {
   return {
    notFound: true,
   };
  }
 }

 return {
  notFound: true,
 };
}
