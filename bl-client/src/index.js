import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <div className="App-menu">
          <button className="menu-item">
            <h1> BOO </h1>
          </button>
          <button className="menu-item">
            <h1> BOO </h1>
          </button>
          <button className="menu-item">
            <h1> BOO </h1>
          </button>
          <button className="menu-item">
            <h1> BOO </h1>
          </button>
        </div>
        <p> HELLO </p>
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
