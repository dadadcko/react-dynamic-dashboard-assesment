import { useContext } from "react";
import { ContainerStretchContext } from "@/contexts/ContainerStretchContext";

const sentinelErrorMessage =
  "useStretchableContainer must be used within a StretchableContainer, which provides context.";

/**
 * Custom hook to access the ContainerStretchContext.
 * @throws Error when used outside a StretchableContainer.
 * @returns The context value from ContainerStretchContext.
 */
export const useStretchableContainer = () => {
  const ctx = useContext(ContainerStretchContext);

  if (!ctx) {
    throw new Error(sentinelErrorMessage);
  }

  return ctx;
};
