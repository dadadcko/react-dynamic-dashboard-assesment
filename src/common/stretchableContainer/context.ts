import { createContext, useContext } from "react";
import type {
  ContainerStretchStore,
  createStretchableContainerStore,
} from "@/common/stretchableContainer/store.ts";
import { useStore } from "zustand";

/**
 * Context to manage container stretch state
 */
export const ContainerStretchContext = createContext<ReturnType<
  typeof createStretchableContainerStore
> | null>(null);

const sentinelErrorMessage =
  "Missing ContainerStretchContext.Provider in the component tree. This hook can only be used within ContainerStretchContext";

/**
 * Custom hook to access the ContainerStretchStore.
 * @throws Error when used outside a ContainerStretchContext.
 * @returns The store instance from ContainerStretchContext.
 */
export function useStretchableContainer<T>(selector: (state: ContainerStretchStore) => T) {
  const store = useContext(ContainerStretchContext);

  if (!store) {
    throw new Error(sentinelErrorMessage);
  }

  return useStore(store, selector);
}
