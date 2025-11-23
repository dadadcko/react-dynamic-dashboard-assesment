import { ActionIcon, Menu } from "@mantine/core";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-react";

interface WidgetSettingsMenuProps {
  onDelete?: () => void;
}

export function WidgetSettingsMenuComponent({ onDelete }: WidgetSettingsMenuProps) {
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
        <Menu.Item c="red" leftSection={<IconTrash size={14} />} onClick={onDelete}>
          Delete widget
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
