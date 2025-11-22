import { ActionIcon, Menu } from "@mantine/core";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-react";

export function WidgetSettingsMenu() {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="default" color="dark" aria-label="Open settings for widget">
          <IconSettings />
        </ActionIcon>
      </Menu.Target>
      {/* TODO: ADD ACTIONS ON THESE...*/}
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconEdit size={14} />}>Edit widget</Menu.Item>
        <Menu.Item c="red" leftSection={<IconTrash size={14} />}>
          Delete widget
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
