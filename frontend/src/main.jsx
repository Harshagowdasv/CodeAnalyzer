import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Signin from "./pages/Signin.jsx";
import Register from "./pages/Register.jsx";
import "./index.css";
import Codedashboard from "./pages/Codedashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Register/>}/>
      <Route path="/dashboard" element={<Codedashboard />} />
    </Routes>
  </BrowserRouter>
);