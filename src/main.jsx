// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AIChatProvider } from "./context/AIChatContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AIChatProvider>
          <App />
        </AIChatProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
