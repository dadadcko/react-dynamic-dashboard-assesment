import type { FunctionComponent } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export const ThemeSwapperButton: FunctionComponent = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme({ keepTransitions: true });

  const nextTheme = colorScheme === "dark" ? "light" : "dark";
  const NextThemeIcon = colorScheme === "dark" ? IconSun : IconMoon;

  return (
    <ActionIcon
      onClick={() => setColorScheme(nextTheme)}
      variant="subtle"
      radius="xl"
      size="lg"
      color="gray"
      aria-label={`Toggle color scheme to ${nextTheme}`}>
      <NextThemeIcon />
    </ActionIcon>
  );
};
