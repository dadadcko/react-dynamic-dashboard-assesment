import type { Dispatch, SetStateAction } from "react";
import { createStore, type StateCreator, type StoreApi } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Default container stretch state
 */
export const DEFAULT_CONTAINER_STRETCH_STATE = {
  isFluid: false as boolean,
  maxWidth: 1280 as string | number,
};

/**
 * Type for container stretch state
 */
export type ContainerStretchState = typeof DEFAULT_CONTAINER_STRETCH_STATE;

/**
 * Actions to update container stretch state
 */
export interface ContainerStretchActions {
  setFluid: Dispatch<SetStateAction<ContainerStretchState["isFluid"]>>;
  setMaxWidth: Dispatch<SetStateAction<ContainerStretchState["maxWidth"]>>;
}

export type ContainerStretchStore = ContainerStretchState & ContainerStretchActions;

export interface StretchableContainerStoreFactoryProps {
  /**
   * ID of the stretchable container.
   *  used to map store to specific container instance.
   */
  id: string;
}

/**
 * Factory for StretchableContainer store.
 * Creates a new isolated store instance.
 */
export function createStretchableContainerStore(
  props: StretchableContainerStoreFactoryProps,
): StoreApi<ContainerStretchStore> {
  // Store definition
  const storeCreator: StateCreator<ContainerStretchStore> = (set, get) => ({
    // State
    ...DEFAULT_CONTAINER_STRETCH_STATE,

    // Actions
    setFluid: setter => updateSlice(get(), set, setter, "isFluid"),
    setMaxWidth: setter => updateSlice(get(), set, setter, "maxWidth"),
  });

  // Create store with persistence
  return createStore<ContainerStretchStore>()(
    persist(storeCreator, {
      name: `stretchable-container-${props.id}`,
      storage: createJSONStorage(() => localStorage),
    }),
  );
}

/**
 * Helper to update a slice of state
 */
function updateSlice<T, K extends keyof T>(
  state: T,
  setState: Dispatch<SetStateAction<T>>,
  setter: SetStateAction<T[K]>,
  propertyName: K,
) {
  type StateUpdaterFn = (p: T[K]) => T[K];

  setState({
    ...state,
    [propertyName]:
      typeof setter === "function"
        ? (setter as StateUpdaterFn)(state[propertyName]) // Setter is state updater function for sure
        : setter, // Setter is raw value
  });
}
