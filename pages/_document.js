import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document () {
  return (
  <Html>
   <Head>
    <meta content='На этом сайте вы можете укоротить ссылку любой длины' name='description' />
    <meta
     content='сократить ссылку, links shortener, укоротить ссылку, ссылка, ссылки, короткая, короткая ссылка, короткие ссылки, сделать, сделать короткую ссылку'
     name='keywords' />
    <meta content='https://кириешка.рф' name='author' />

    <meta content='TRPP.RU' property='og:title' />
    <meta content='Лучший сокращатель ссылок' property='og:description' />
    <meta content='/cover.png' property='og:image' />
    <meta content='https://trpp.ru' property='og:url' />
    <meta content='TRPP.RU' property='og:site_name' />

    <meta content='TRPP.RU' name='twitter:title' />
    <meta content='Лучший сокращатель ссылок' name='twitter:description' />

    <meta content='TRPP.RU' itemProp='name' />
    <meta content='Лучший сокращатель ссылок' itemProp='description' />
    <meta content='/cover.png' itemProp='image' />

    <script type='text/javascript' dangerouslySetInnerHTML={{
      __html: `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
     m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
     (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

     ym(89671309, "init", {
     clickmap:true,
     trackLinks:true, 
     accurateTrackBounce:true
    });
    `
    }}>
    </script>
    <noscript>
     <div><img src='https://mc.yandex.ru/watch/89671309' style={{ position: 'absolute', left: '-9999px' }} alt='' />
     </div>
    </noscript>
    <script async src='https://www.googletagmanager.com/gtag/js?id=G-L495LT8PWQ'></script>
    <script dangerouslySetInnerHTML={{
      __html: `
    window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-L495LT8PWQ');
    `
    }}></script>
   </Head>
   <body>
   <Main />
   <NextScript />
   </body>
  </Html>
  );
}
