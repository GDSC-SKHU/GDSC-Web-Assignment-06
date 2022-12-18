import type { AppProps } from 'next/app';
import GlobalStyled from '../styles/GlobalStyle';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyled />
      <Component {...pageProps} />
    </>
  );
}
