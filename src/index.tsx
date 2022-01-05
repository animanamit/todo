import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListView } from "./list-view.component";
import { NavLink } from "react-router-dom";
import FocusView from "./focus-view.component";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <nav>
        <NavLink to="/">Focus</NavLink>
        <NavLink to="/list">List</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<FocusView />} />
        <Route path="/list" element={<ListView />} />
      </Routes>
    </BrowserRouter> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
