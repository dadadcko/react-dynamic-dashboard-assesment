import {
  type Dispatch,
  type FunctionComponent,
  type PropsWithChildren,
  type SetStateAction,
  useState,
} from "react";
import {
  ContainerStretchContext,
  type ContainerStretchContextType,
  type ContainerStretchState,
  defaultContainerStretchState,
} from "@/contexts/ContainerStretchContext";
import { Container } from "@mantine/core";

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

/**
 * Container that can stretch to fluid width or have max width
 *
 * Also provides {@link ContainerStretchContext} to children so they can adjust the stretching behavior
 *
 */
export const StretchableContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<ContainerStretchState>(defaultContainerStretchState);

  const ctxValue: ContainerStretchContextType = {
    isFluid: state.isFluid,
    maxWidth: state.maxWidth,
    setFluid: setter => updateSlice(state, setState, setter, "isFluid"),
    setMaxWidth: setter => updateSlice(state, setState, setter, "maxWidth"),
  };

  return (
    <ContainerStretchContext.Provider value={ctxValue}>
      <Container
        fluid={state.isFluid}
        size={state.maxWidth}
        w="100%"
        px={0}
        style={{ transition: "all 0.25s ease" }}>
        {children}
      </Container>
    </ContainerStretchContext.Provider>
  );
};
