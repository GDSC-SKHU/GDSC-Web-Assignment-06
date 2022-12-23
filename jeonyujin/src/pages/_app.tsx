import type { AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import styled from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <nav>
        <StyledH1>How to do Todo?!</StyledH1>
        <StyledH3>made by yujin</StyledH3>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

const StyledH1 = styled.h1`
  text-align: center;
  color: white;
  background: black;
  margin: 0;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const StyledH3 = styled.h3`
  display: flex;
  float: right;
  margin-right: 20px;
`;
