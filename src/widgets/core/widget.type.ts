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
 * Widget configuration interface for widgets that fetch remote data.
 *
 * This extends {@link WidgetConfig} with additional
 *   properties for remote data fetching.
 */
export interface WidgetConfigWithRemoteData extends WidgetConfig {
  /**
   * URL to fetch remote data for the widget
   */
  dataUrl: string;

  /**
   * Key to select specific data from the fetched response
   *
   * Supports nested keys using dot notation (e.g., 'data.items.0.name')
   */
  dataKey?: string;

  /**
   * Optional delay (in milliseconds) to simulate data fetching latency
   *
   * NOTE THIS IS ONLY FOR DEMO PURPOSES, in real applications, avoid artificial delays.
   */
  dataFetchDelay?: number;
}

/**
 * Widget runtime interface.
 *
 * This is built from {@link WidgetConfig} with additional runtime properties.
 */
export interface Widget extends WidgetConfig {
  /**
   * Renderer function for the widget.
   * @returns A ReactNode representing the widget's UI.
   */
  render: () => ReactNode;
}
