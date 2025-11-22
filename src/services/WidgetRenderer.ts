import type { Widget } from "@/types/widget.types.ts";
import { type ReactNode } from "react";

/**
 * Renderer interface for widgets
 * Uses visitor pattern to separate rendering logic for each concrete widget type
 */
export interface WidgetRenderer {
  /**
   * Render the widget based on its configuration
   * (aka the "visit" method in visitor pattern)
   * @param config - The widget configuration to render

   * @returns ReactNode representing the rendered widget
   */
  render: (config: Widget) => ReactNode;

  renderUnknown: (config: Widget & { type: "unknown"; originalType: string }) => ReactNode;
}

/**
 * Default implementation of WidgetRenderer
 * Delegates rendering to the widget's accept method
 */
export class DefaultWidgetRenderer implements WidgetRenderer {
  render(config: Widget): ReactNode {
    return config.accept(this);
  }

  renderUnknown(config: Widget & { type: "unknown"; originalType: string }): ReactNode {
    return `Unknown widget type - ${config.originalType}`;
  }
}
