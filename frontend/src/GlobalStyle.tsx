import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  * {
      font-family: Arial, Helvetica, sans-serif;
  }
  :root {
      --paper-border: 1px solid #dadce0;
      --project-color: #cc3399;
      --errors-list-color: rgb(255, 210, 218);
  }
`;

export default GlobalStyle;
