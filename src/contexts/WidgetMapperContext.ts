import { createContext } from "react";
import { DEFAULT_WIDGET_MAPPER_CHAIN, type WidgetMapper } from "@/services/WidgetMapper.ts";

/**
 * Context to provide the widget mapper.
 *
 * By default, it uses the {@link DEFAULT_WIDGET_MAPPER_CHAIN}.
 * @see DEFAULT_WIDGET_MAPPER_CHAIN
 */
export const WidgetMapperContext = createContext<WidgetMapper>(DEFAULT_WIDGET_MAPPER_CHAIN);
