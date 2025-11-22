import type { WidgetRenderer } from "@/services/WidgetRenderer.ts";
import type { ReactNode } from "react";

export interface WidgetConfig {
  /**
   * Unique identifier for the widget
   */
  id: string;

  /**
   * Type of the widget (e.g., 'chart', 'table', 'list')
   *
   * Why string? To allow for extensibility with custom widget types
   */
  type: string;

  /**
   * Title of the widget
   */
  title: string;

  /**
   * Optional description of the widget
   */
  description?: string;
}

/**
 * Widget interface, ready to be rendered.
 * This is built from WidgetConfig with additional runtime properties.
 */
export interface Widget extends WidgetConfig {
  /**
   * Accept a renderer to render this widget
   * (aka the "accept" method in visitor pattern)
   * @param renderer - The widget renderer to use
   */
  accept: (renderer: WidgetRenderer) => ReactNode;
}
