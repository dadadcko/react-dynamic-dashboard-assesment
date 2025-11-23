import type { FunctionComponent } from "react";
import { MantineProvider, type MantineProviderProps } from "@mantine/core";

export const MantineThemeProvider: FunctionComponent<MantineProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <MantineProvider defaultColorScheme="auto" {...props}>
      {children}
    </MantineProvider>
  );
};
