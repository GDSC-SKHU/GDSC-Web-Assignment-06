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
        font-display: swap;
        
    }
    body{
        font-family: 'LineSeedfont';
        background-image: url('/images/backgroundimg.jpg');
        background-repeat: no-repeat;
        background-size:cover;
    }

    a{
        text-decoration: none;
    }
`;

export default GlobalStyled;
