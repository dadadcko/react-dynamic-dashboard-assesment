import { type FunctionComponent, type PropsWithChildren, useRef } from "react";
import { Container } from "@mantine/core";
import { createStretchableContainerStore } from "@/common/stretchableContainer/store.ts";
import {
  ContainerStretchContext,
  useStretchableContainer,
} from "@/common/stretchableContainer/context.ts";

interface StretchableContainerProps extends PropsWithChildren {
  id?: string;
}

const StretchableContainerWithProvider: FunctionComponent<StretchableContainerProps> = ({
  children,
  id = "root",
}) => {
  const containerStretchStoreRef = useRef<ReturnType<typeof createStretchableContainerStore>>(null);

  // Create store instance for this container (if not already created)
  containerStretchStoreRef.current ??= createStretchableContainerStore({ id });

  return (
    <ContainerStretchContext.Provider value={containerStretchStoreRef.current}>
      <StretchableContainer_>{children}</StretchableContainer_>
    </ContainerStretchContext.Provider>
  );
};

const StretchableContainer_: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const isFluid = useStretchableContainer(s => s.isFluid);
  const maxWidth = useStretchableContainer(s => s.maxWidth);

  return (
    <Container
      fluid={isFluid}
      size={maxWidth}
      w="100%"
      px={0}
      style={{ transition: "all 0.25s ease" }}>
      {children}
    </Container>
  );
};

/**
 *
 * Container that can stretch to fluid width or have max width
 *
 * Also provides {@link ContainerStretchContext} to children so they can adjust the stretching behavior
 *
 */
export const StretchableContainer = StretchableContainerWithProvider;
