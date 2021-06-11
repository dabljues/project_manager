import GlobalStyle from "GlobalStyle";
import React from "react";
import ReactDOM from "react-dom";

import App from "./containers/App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
