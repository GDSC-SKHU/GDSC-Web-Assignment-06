import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    align-items: center;
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: 'Ansungtangmyun-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/Ansungtangmyun-Bold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    }
    

  body {
  font-family: 'Ansungtangmyun-Bold';
  }
`;

export default GlobalStyle;
