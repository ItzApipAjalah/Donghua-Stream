import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PageTransition from '../components/PageTransition';
import '../styles/globals.css'; // Adjust the path as needed

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="https://anime.amwp.website/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Watch the latest and greatest anime series online. Stay updated with ongoing series and explore a vast collection of anime genres."
        />
        <meta
          name="keywords"
          content="anime, streaming, ongoing anime, anime genres, watch anime online, donghua"
        />
        <meta name="author" content="AMWP" />
        <meta property="og:title" content="Donghua Streaming" />
        <meta
          property="og:description"
          content="Watch the latest and greatest anime series online. Stay updated with ongoing series and explore a vast collection of anime genres."
        />
        <meta property="og:image" content="https://i.ibb.co/Ht9qGK0/logo.png" />
        <meta property="og:url" content="https://anime.amwp.website" />
        <meta property="og:type" content="website" />
        <title>Donghua Streaming</title>
      </Head>
      <PageTransition location={useRouter()}>
        <Component {...pageProps} />
      </PageTransition>
    </>
  );
}

export default MyApp;
