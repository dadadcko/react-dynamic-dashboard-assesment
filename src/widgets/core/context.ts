import { createContext } from "react";
import { UnknownWidgetDynamicTypeProvider } from "@/widgets/core/unknown/provider.ts";
import type { WidgetMapper } from "@/widgets/core/mapper.ts";
import type { WidgetActions } from "@/widgets/core/widget.type.ts";

/**
 * Provider interface for widgets.
 *
 * This encapsulates every runtime dependency required by widgets feature engine.
 */
export interface WidgetDynamicTypeProvider {
  mapper: WidgetMapper;
}

/**
 * Context to hold all WidgetDynamicTypeProvider instances.
 *
 * By default, it includes only the UnknownWidgetDynamicTypeProvider (a fallback provider).
 *
 * This context allows for dynamic registration and retrieval of widget type providers at runtime.
 */
export const WidgetDynamicTypeContext = createContext<WidgetDynamicTypeProvider[]>([
  UnknownWidgetDynamicTypeProvider,
]);

/**
 * Context to hold widget actions.
 *
 * By default, no actions are provided.
 *
 * This context allows for dynamic registration and retrieval of widget actions at runtime.
 */
export const WidgetActionsContext = createContext<WidgetActions>({});
