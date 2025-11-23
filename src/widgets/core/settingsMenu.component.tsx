import { ActionIcon, Menu } from "@mantine/core";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-react";
import { WidgetActionsContext } from "@/widgets/core/context.ts";
import { useContext } from "react";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

interface WidgetSettingsMenuProps {
  widget: WidgetConfig;
}

export function WidgetSettingsMenuComponent({ widget }: WidgetSettingsMenuProps) {
  const { onDelete, onEdit } = useContext(WidgetActionsContext);

  // Only define actions that have corresponding handlers
  const actions = [
    {
      label: "Edit widget",
      Icon: IconEdit,
      color: undefined,
      action: onEdit ? () => onEdit(widget) : null,
    },
    {
      label: "Delete widget",
      Icon: IconTrash,
      color: "red",
      action: onDelete ? () => onDelete(widget) : null,
    },
  ].filter(x => Boolean(x.action));

  return actions.length === 0 ? null : (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon variant="default" color="dark" aria-label="Open settings for widget">
          <IconSettings />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {actions.map(({ label, Icon, action, color }) => (
          <Menu.Item key={label} c={color} leftSection={<Icon size={14} />} onClick={action!}>
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
