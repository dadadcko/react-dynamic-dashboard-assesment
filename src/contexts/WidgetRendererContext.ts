import { createContext } from "react";
import { DefaultWidgetRenderer, type WidgetRenderer } from "@/services/WidgetRenderer.ts";

/**
 * Context to provide the widget renderer.
 *
 * By default, it uses the {@link DefaultWidgetRenderer}.
 * @see DefaultWidgetRenderer
 */
export const WidgetRendererContext = createContext<WidgetRenderer>(new DefaultWidgetRenderer());
