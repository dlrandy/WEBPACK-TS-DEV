import * as React from "react";
import * as ReactDOM from "react-dom";
import IndexApp, { IndexAppProps } from "./index/app";
declare let module: any;
declare let window: any;
const a:IndexAppProps = {
test: ''
}
console.log("hello");
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <IndexApp {...a} />
    </React.StrictMode>,
     document.getElementById("root") as HTMLElement)
}


if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe');
  axe(React, ReactDOM, 1200);
  render();
  if (module.hot) {
    module.hot.accept();
  }
}

if (process.env.NODE_ENV === 'production') {
  if (!window.CV) {
    window.CV = {};
  }
  window.CV.surveyShowReady = render;
}