import type { UnknownWidget } from "@/widgets/core/unknown/widget.type.ts";
import { IconAlertTriangle } from "@tabler/icons-react";
import { Text } from "@mantine/core";
import type { FunctionComponent } from "react";

interface UnknownWidgetComponentProps {
  widget: UnknownWidget;
}

/**
 * UI for unknown widget types
 */
export const UnknownWidgetComponent: FunctionComponent<UnknownWidgetComponentProps> = ({
  widget,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <IconAlertTriangle color="orange" size="48" stroke={1.5} />
      <Text c="orange">Unsupported widget type - &#34;{widget.originalType}&#34;</Text>
      <Text size="xs" c="dimmed" mb="xs">
        This widget cannot be rendered, its type is not recognized by the system.
      </Text>
    </div>
  );
};

export default UnknownWidgetComponent;
