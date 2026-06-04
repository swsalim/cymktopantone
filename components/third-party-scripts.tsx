import Script from 'next/script';

export function ThirdPartyScripts() {
  return (
    <>
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="iXowcFpFQHcttGSB1RVGPw"
        strategy="afterInteractive"
      />
      <Script
        src="https://stats.colormapper.xyz/ennui.js"
        data-api-host="https://stats.colormapper.xyz"
        data-token="12198fc1305c777"
        strategy="afterInteractive"
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3799479098488751"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <Script
        src="https://cdn.apitiny.net/scripts/v2.0/main.js"
        data-site-id="6a1efc0c2429acc1401eef3e"
        data-test-mode="false"
        strategy="lazyOnload"
      />
    </>
  );
}
