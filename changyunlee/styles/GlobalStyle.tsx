import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
input{
  all: unset;
  background-color: #e9bdfa;
  border-radius:5px;
  color: #d478f8;
  padding: 5px;
  width: 240px;
  
  
}
// styled-component로 꾸미면 에러
// ncorrect casing. Use PascalCase for React components, or lowercase for HTML elements.
body{
  background-color: #f6f6f6;
  margin:0;
  padding:0;
  box-sizing:border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}`;

export default GlobalStyle;
