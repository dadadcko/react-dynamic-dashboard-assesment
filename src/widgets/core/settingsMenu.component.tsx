import { ActionIcon, Menu } from "@mantine/core";
import { IconEdit, IconSettings, IconTrash } from "@tabler/icons-react";
import { WidgetActionsContext } from "@/widgets/core/context.ts";
import { lazy, useContext, useState } from "react";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";

const LazyEditFormComponent = lazy(() => import("@/widgets/core/forms/form.component.tsx"));

interface WidgetSettingsMenuProps {
  widget: WidgetConfig;
}

export function WidgetSettingsMenuComponent({ widget }: WidgetSettingsMenuProps) {
  const { onDelete, onSave } = useContext(WidgetActionsContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleWidgetSave = (updatedWidget: WidgetConfig) => {
    if (onSave) {
      onSave(updatedWidget);
    }
    setIsEditing(false);
  };

  // Only define actions that have corresponding handlers
  const actions = [
    {
      label: "Edit widget",
      Icon: IconEdit,
      color: undefined,
      action: onSave ? () => setIsEditing(true) : null, // Open the edit form
    },
    {
      label: "Delete widget",
      Icon: IconTrash,
      color: "red",
      action: onDelete ? () => onDelete(widget) : null,
    },
  ].filter(x => Boolean(x.action));

  return actions.length === 0 ? null : (
    <>
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

      {/* Handle for edit form component*/}
      <LazyEditFormComponent
        widget={widget}
        show={isEditing && Boolean(onSave)}
        onSubmit={handleWidgetSave}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}
