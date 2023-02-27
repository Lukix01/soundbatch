import '../styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import CookiesAlert from '../components/CookiesAlert';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>SoundBatch</title>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <CookiesAlert />
      <Component {...pageProps} />
    </>
  );
}

export default App;
