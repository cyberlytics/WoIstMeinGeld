import "./index.scss";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("app");

if (!container) {
    throw new Error("React container #app is missing!");
}

const root = createRoot(container);
root.render(<App />);
