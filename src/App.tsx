import { Anchor, AppShell, Avatar, Center, Group, Text } from "@mantine/core";
import { ThemeSwapperButton } from "@/components/ThemeSwapperButton";
import { StretchableContainer } from "@/components/StretchableContainer";

export function App() {
  return (
    <AppShell padding="lg" header={{ height: 60 }} footer={{ height: 60 }}>
      {/* Header */}
      <AppShell.Header>
        <Group wrap="nowrap" px="md" h="100%" justify="space-between" className="text-no-overflow">
          <Text lineClamp={1} size="xl">
            🚀 Dynamic dashboard App
          </Text>
          <Group wrap="nowrap" gap="sm">
            <ThemeSwapperButton />
            <Avatar size="md" />
          </Group>
        </Group>
      </AppShell.Header>

      {/* Main page content */}
      <AppShell.Main>
        <StretchableContainer>HERE WILL BE DASHBOARD... :)</StretchableContainer>
      </AppShell.Main>

      {/* Footer */}
      <AppShell.Footer>
        <Center h="100%">
          <Text ta="center" lineClamp={1}>
            Made with ❤️ by{" "}
            <Anchor
              href="https://github.com/dadadcko"
              target="_blank"
              underline="never"
              rel="noopener">
              Daniel Slanina
            </Anchor>
            , 2025
          </Text>
        </Center>
      </AppShell.Footer>
    </AppShell>
  );
}
