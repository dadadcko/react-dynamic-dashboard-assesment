import { createContext } from "react";
import type { createStretchableContainerStore } from "@/store/stretchableContainer.store.ts";

/**
 * Context to manage container stretch state
 */
export const ContainerStretchContext = createContext<ReturnType<
  typeof createStretchableContainerStore
> | null>(null);
