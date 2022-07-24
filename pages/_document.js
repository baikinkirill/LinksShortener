import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document () {
  return (
  <Html>
   <Head>
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
  )
}
