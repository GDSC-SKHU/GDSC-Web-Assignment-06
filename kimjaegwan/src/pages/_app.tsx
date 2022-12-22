import type { AppProps } from 'next/app';
import Global from '../../styles/style';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Global />
            <Component {...pageProps} />
        </>
    );
}
