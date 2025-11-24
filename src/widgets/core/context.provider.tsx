import { type PropsWithChildren, useContext, useMemo } from "react";
import {
  WidgetDynamicTypeContext,
  type WidgetDynamicTypeProvider,
} from "@/widgets/core/context.ts";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

/**
 * Props for WidgetDynamicTypeContextProvider.
 */
export interface WidgetDynamicTypeContextProviderProps<T extends WidgetConfig = WidgetConfig>
  extends PropsWithChildren {
  dynamicWidgetTypeProvider: WidgetDynamicTypeProvider<T>;
}

/**
 * Widget Dynamic Type Context Provider.
 *
 * Allows to add a new dynamic widget type to the application.
 * This provider concatenates its dynamic type providers with the existing ones.
 *
 * @param children
 * @param dynamicWidgetTypeProvider
 */
export const WidgetDynamicTypeContextProvider = <T extends WidgetConfig = WidgetConfig>({
  children,
  dynamicWidgetTypeProvider,
}: WidgetDynamicTypeContextProviderProps<T>) => {
  const providers = useContext(WidgetDynamicTypeContext);

  // Defensive technique - if for some reason providers is undefined, create a new array
  // Wrapped in memo just to be sure (in case React compiler doesn't optimize it)
  const newProviders = useMemo(
    () => (providers ? [...providers, dynamicWidgetTypeProvider] : [dynamicWidgetTypeProvider]),
    [providers, dynamicWidgetTypeProvider],
  ) as WidgetDynamicTypeProvider[];

  return (
    <WidgetDynamicTypeContext.Provider value={newProviders}>
      {children}
    </WidgetDynamicTypeContext.Provider>
  );
};
