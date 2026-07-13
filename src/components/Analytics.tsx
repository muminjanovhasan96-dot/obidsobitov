import Script from "next/script";

/**
 * Analytics — Google Analytics (GA4) and Yandex Metrica (popular in UZ).
 * Both are OFF until you set the corresponding public env var, so nothing
 * loads in development or before the client provides IDs:
 *
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        (Google Analytics 4)
 *   NEXT_PUBLIC_YANDEX_METRICA_ID=12345678 (Yandex Metrica counter id)
 *
 * Set them locally in .env.local and on Vercel under Project → Settings →
 * Environment Variables, then redeploy.
 */
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const ym = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <>
      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      ) : null}

      {ym ? (
        <Script id="ym-init" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${ym},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
        </Script>
      ) : null}
    </>
  );
}
