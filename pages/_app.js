import Head from 'next/head';
import "../styles/style.css";
import '../styles/Game.css';

console.log('App component rendered');

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Portfolio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
