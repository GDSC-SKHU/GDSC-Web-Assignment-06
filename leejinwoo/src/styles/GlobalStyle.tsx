import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;
}
`;
