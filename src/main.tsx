import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { MantineThemeProvider } from "./MantineThemeProvider";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineThemeProvider>
      <App />
    </MantineThemeProvider>
  </StrictMode>,
);
