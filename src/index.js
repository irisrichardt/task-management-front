import React from "react";
import ReactDOM from "react-dom/client"; // Importa createRoot
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement); // Cria a raiz do React usando createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
