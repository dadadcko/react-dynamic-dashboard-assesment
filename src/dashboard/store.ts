import { createStore, type StateCreator, type StoreApi } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";
import { type DashboardConfig, DEFAULT_DASHBOARD_CONFIG } from "@/dashboard/dashboard.type.ts";

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
  toggleLock: () => void;
  moveWidget: (widget: WidgetConfig, toIndex: number) => void;
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

    /**
     * Toggles the locked state of the dashboard.
     */
    toggleLock: () => {
      set({
        ...get(),
        locked: !get().locked,
      });
    },

    /**
     * Moves a widget to a new index in the widgets array.
     * @param widget - The widget to move.
     * @param toIndex - The target index to move the widget to.
     */
    moveWidget: (widget: WidgetConfig, toIndex: number) => {
      const widgets = get().widgets;
      const currentIndex = widgets.findIndex(w => w.id === widget.id);

      if (currentIndex === -1 || currentIndex === toIndex) {
        return; // Widget not found or no move needed
      }

      // Check bounds of new index
      if (toIndex < 0 || toIndex >= widgets.length) {
        return; // Invalid index
      }

      set({
        ...get(),
        widgets: arrayMove(widgets, currentIndex, toIndex),
      });
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
