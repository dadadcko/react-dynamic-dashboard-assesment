import { afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";
import { createElement, type ReactNode } from "react";
import { MantineThemeProvider } from "@/common/mantineTheme.provider.tsx";

function setupMocksForMantine() {
  const gcs = window.getComputedStyle;
  window.getComputedStyle = elt => gcs(elt);
  window.HTMLElement.prototype.scrollIntoView = () => {
    /* empty */
  };

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class ResizeObserver {
    observe() {
      /* empty */
    }
    unobserve() {
      /* empty */
    }
    disconnect() {
      /* empty */
    }
  }

  window.ResizeObserver = ResizeObserver;
}

/**
 * Custom render function to include MantineThemeProvider for testing
 *
 * @param ui - The React node to render, wrapped with MantineThemeProvider
 * @returns The result of the render function.
 */
export function renderWithMantine(ui: ReactNode) {
  return render(createElement(MantineThemeProvider, { env: "test" }, ui));
}

setupMocksForMantine();

// Runs a cleanup after each test case
afterEach(() => {
  cleanup();
});
