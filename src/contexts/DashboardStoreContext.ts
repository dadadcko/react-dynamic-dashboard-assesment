import { createContext } from "react";
import { type createDashboardStore } from "@/store/dashboard.store.ts";

/**
 * Context to hold the dashboard store.
 */
export const DashboardStoreContext = createContext<ReturnType<typeof createDashboardStore> | null>(
  null,
);
