import App from "./app";
import "./style.css";
import ReactDom from "react-dom";
import React from "react";


// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

const root = document.getElementById("app");
// new App(root);

ReactDom.render( /*#__PURE__*/React.createElement(App, null), root);
