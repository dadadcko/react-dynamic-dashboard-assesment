import { type DashboardConfig, DEFAULT_DASHBOARD_CONFIG } from "@/types/dashboard.types.ts";
import { createStore, type StateCreator, type StoreApi } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

/**
 * State for Dashboard module.
 */
export type DashboardState = DashboardConfig;

/**
 * Actions for Dashboard module.
 */
export interface DashboardActions {
  deleteWidget: (id: WidgetConfig["id"]) => void;
  clearWidgets: () => void;
}

/**
 * Actual DashboardStore consisting of both State and Actions
 */
export type DashboardStore = DashboardState & DashboardActions;

export interface DashboardStoreFactoryProps {
  id: DashboardConfig["title"];
}

/**
 * Factory for Dashboard store.
 * Creates a new isolated store instance.
 */
export function createDashboardStore(props: DashboardStoreFactoryProps): StoreApi<DashboardStore> {
  const dashboardId = props?.id || DEFAULT_DASHBOARD_CONFIG.title;

  // Store definition
  const storeCreator: StateCreator<DashboardStore> = (set, get) => ({
    // State
    ...DEFAULT_DASHBOARD_CONFIG,
    title: dashboardId,

    // Actions
    /**
     * Clears all widgets from the dashboard.
     */
    clearWidgets: () => {
      set({
        ...get(),
        widgets: [],
      });
    },

    /**
     * Deletes a widget by its ID.
     * @param id - The ID of the widget to delete.
     */
    deleteWidget: (id: WidgetConfig["id"]) => {
      const filteredWidgets = get().widgets.filter(widget => widget.id !== id);
      // only if a widget was actually removed
      if (filteredWidgets.length !== get().widgets.length) {
        set({
          ...get(),
          widgets: filteredWidgets,
        });
      }
    },
  });

  // Create store with persistence
  return createStore<DashboardStore>()(
    persist(storeCreator, {
      name: dashboardId,
      storage: createJSONStorage(() => localStorage), // TODO: extract to provider
    }),
  );
}
