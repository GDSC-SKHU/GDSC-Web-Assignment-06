import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        @font-face {
            font-family: 'LineSeedfont';
            src: url('/fonts/LINESeedKR-Bd.ttf');
        }
        
    }
    body{
        font-family: 'LineSeedfont';
    }

    a{
        text-decoration: none;
    }
`;

export default GlobalStyled;
