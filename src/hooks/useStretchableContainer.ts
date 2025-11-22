import { useContext } from "react";
import { ContainerStretchContext } from "@/contexts/ContainerStretchContext";
import { useStore } from "zustand";
import type { ContainerStretchStore } from "@/store/stretchableContainer.store.ts";

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
