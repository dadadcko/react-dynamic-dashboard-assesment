import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

import "./index.css";
import { MantineThemeProvider } from "@/common/mantineTheme.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineThemeProvider>
      <App />
    </MantineThemeProvider>
  </StrictMode>,
);
