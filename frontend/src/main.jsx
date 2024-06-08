import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
/*  http://localhost:8000 */
/* https://trendhive.onrender.com */
export const Server = "https://trendhive.onrender.com/api/v1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
