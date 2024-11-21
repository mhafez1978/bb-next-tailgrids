import Script from "next/script";

const Adsense = ({ publisher_id }: { publisher_id: string }) => {
  return (
    <Script
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisher_id}`}
      strategy="afterInteractive"
    />
  );
};

export default Adsense;
