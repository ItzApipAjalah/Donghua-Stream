// pages/_app.tsx
import Head from 'next/head';
import '../styles/globals.css'; // Adjust the import path as needed

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Watch the latest and greatest anime series online. Stay updated with ongoing series and explore a vast collection of anime genres."
        />
        <meta
          name="keywords"
          content="anime, streaming, ongoing anime, anime genres, watch anime online"
        />
        <meta name="author" content="OtakuDesu" />
        <meta property="og:title" content="Anime Streaming" />
        <meta
          property="og:description"
          content="Watch the latest and greatest anime series online. Stay updated with ongoing series and explore a vast collection of anime genres."
        />
        <meta property="og:image" content="https://i.ibb.co.com/Ht9qGK0/logo.png" />
        <meta property="og:url" content="https://anime.amwp.website" />
        <meta property="og:type" content="website" />
        <title>Anime Streaming</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
