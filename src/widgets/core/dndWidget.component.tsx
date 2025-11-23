import { createElement, type FunctionComponent } from "react";
import { Widget, type WidgetComponentProps } from "@/widgets/core/widget.component.tsx";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mantine/core";

export interface DndWidgetComponent extends WidgetComponentProps {
  disabled?: boolean;
}

/**
 * Wrapper component for Widget that adds drag-and-drop functionality to a widget.
 *
 * Must be used within a DndContext and SortableContext from @dnd-kit.
 */
export const DndWidgetComponent: FunctionComponent<DndWidgetComponent> = ({
  disabled = false,
  ...props
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.config.id,
    disabled,
  });

  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        minHeight: props.height,
      }}>
      {!disabled && (
        <Box
          pos="relative"
          p={8}
          mb={-8}
          fz={12}
          bdrs="sm"
          c="dimmed"
          ta="center"
          style={{
            touchAction: "none",
            cursor: "grab",
            userSelect: "none",
            zIndex: 2,
          }}
          {...attributes}
          {...listeners}>
          ⋮⋮ Drag to reorder
        </Box>
      )}
      {createElement(Widget, props)}
    </Box>
  );
};
