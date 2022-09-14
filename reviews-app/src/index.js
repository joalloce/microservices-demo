import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ReviewContextProvider } from "./context/ReviewContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReviewContextProvider>
      <App />
    </ReviewContextProvider>
  </React.StrictMode>
);
