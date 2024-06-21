import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import Canvas from "./canvas";
import GlobalController from "./controller/main";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalController />
    <Canvas />
  </StrictMode>,
);
