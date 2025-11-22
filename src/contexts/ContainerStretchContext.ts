import { createContext, type Dispatch, type SetStateAction } from "react";

/**
 * Default container stretch state
 */
export const defaultContainerStretchState = {
  isFluid: false as boolean,
  maxWidth: 1280 as string | number,
};

/**
 * Type for container stretch state
 */
export type ContainerStretchState = typeof defaultContainerStretchState;

/**
 * Actions to update container stretch state
 */
export interface ContainerStretchActions {
  setFluid: Dispatch<SetStateAction<ContainerStretchState["isFluid"]>>;
  setMaxWidth: Dispatch<SetStateAction<ContainerStretchState["maxWidth"]>>;
}

export type ContainerStretchContextType = ContainerStretchState & ContainerStretchActions;

/**
 * Context to manage container stretch state
 */
export const ContainerStretchContext = createContext<ContainerStretchContextType | null>(null);
