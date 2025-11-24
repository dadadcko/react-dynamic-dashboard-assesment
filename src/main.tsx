import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

import "@mantine/core/styles.css";

import { MantineThemeProvider } from "@/common/mantineTheme.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineThemeProvider>
      <App />
    </MantineThemeProvider>
  </StrictMode>,
);
