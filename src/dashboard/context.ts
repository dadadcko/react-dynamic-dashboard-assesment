import { createContext, useContext } from "react";
import type { createDashboardStore, DashboardStore } from "@/dashboard/store.ts";
import { useStore } from "zustand";

/**
 * Context to hold the dashboard store.
 */
export const DashboardStoreContext = createContext<ReturnType<typeof createDashboardStore> | null>(
  null,
);

const sentinelErrorMessage =
  "Missing DashboardStoreContext.Provider in the component tree. This hook can only be used within Dashboard context";

/**
 * Custom hook to access the DashboardStore.
 * @throws Error when used outside a DashboardStoreContext.
 * @returns The store instance from DashboardStoreContext.
 */
export function useDashboardStore<T>(selector: (state: DashboardStore) => T) {
  const store = useContext(DashboardStoreContext);

  if (!store) {
    throw new Error(sentinelErrorMessage);
  }

  return useStore(store, selector);
}
