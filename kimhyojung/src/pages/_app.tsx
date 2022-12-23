import type { AppProps } from 'next/app';
import GlobalStyled from '../styles/GlobalStyle';
import CurrentTime from '../components/time';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyled />
      <CurrentTime />
      <Component {...pageProps} />
    </>
  );
}
