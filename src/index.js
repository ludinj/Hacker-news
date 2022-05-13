import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App name="Saeloun blog" />);
root.render(<App />);
