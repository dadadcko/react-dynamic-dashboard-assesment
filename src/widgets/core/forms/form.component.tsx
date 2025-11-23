import { Box, Button, Divider, Drawer, type DrawerProps, useDrawersStack } from "@mantine/core";
import { type FunctionComponent, lazy, type ReactNode, useEffect, useState } from "react";
import type { WidgetConfig } from "@/widgets/core/widget.type.ts";
import { SelectWidgetTypeComponent } from "@/widgets/core/forms/selectWidgetType.component.tsx";
import { IconArrowBack } from "@tabler/icons-react";
import { ErrorBoundary } from "react-error-boundary";

// Lazy load the error component to optimize initial load
const LazyRenderErrorComponent = lazy(() => import("@/common/renderError.component.tsx"));

const ADD_WIDGET_FORM_DRAWER_ID = "add-widget-form-drawer";
const EDIT_WIDGET_FORM_DRAWER_ID = "edit-widget-form-drawer";

export interface WidgetFormComponentProps {
  /**
   * Optional widget configuration to edit.
   * If provided, the form will be in edit mode.
   * If not provided, the form will be in add mode.
   */
  widget?: WidgetConfig;

  /**
   * Whether to show the form in the drawer.
   */
  show: boolean;
  onClose: () => void;
  onSubmit: (config: WidgetConfig) => void;
}

/**
 * Widget Form Component
 *  Renders a form inside a drawer for widget configuration
 */
export const WidgetFormComponent: FunctionComponent<WidgetFormComponentProps> = ({
  widget,
  show,
  onClose,
}) => {
  const { open, close, closeAll, register } = useDrawersStack([
    ADD_WIDGET_FORM_DRAWER_ID,
    EDIT_WIDGET_FORM_DRAWER_ID,
  ]);
  const [renderRetryCount, setRenderRetryCount] = useState(0);

  const [widgetState, setWidgetState] = useState<WidgetConfig | undefined>(widget);

  // Sync local state with prop changes
  useEffect(() => {
    setWidgetState(widget);
  }, [widget]);

  // Handle opening/closing drawer based on show prop
  useEffect(() => {
    if (show) {
      // Close any open drawers first
      closeAll();

      // Open the appropriate drawer based on whether we're editing or adding
      const drawerId = widget ? EDIT_WIDGET_FORM_DRAWER_ID : ADD_WIDGET_FORM_DRAWER_ID;
      open(drawerId);
    } else {
      closeAll();
    }
  }, [show, widget, open, closeAll]);

  // Handle when form is closed without submitting
  const handleClose = () => {
    closeAll();
    onClose();
  };

  const handleSelectWidgetType = (config: WidgetConfig) => {
    setWidgetState(config);
    open(EDIT_WIDGET_FORM_DRAWER_ID);
  };

  const isEditMode = Boolean(widget);

  const defaultDrawerProps: Omit<DrawerProps, "opened"> = {
    onClose: handleClose,
    position: "right",
    size: "lg",
    title: isEditMode ? `Edit Widget` : "Add Widget",
    closeButtonProps: {
      "aria-label": isEditMode ? "Close edit widget form" : "Close add widget form",
    },
    transitionProps: { transition: "slide-left", duration: 300 },
  };

  const wrapInErrorBoundary = (component: ReactNode) => (
    <ErrorBoundary
      onReset={() => setRenderRetryCount(count => count + 1)}
      fallbackRender={props => (
        <LazyRenderErrorComponent {...props} retry={renderRetryCount} resourceName="Widget Form" />
      )}>
      {component}
    </ErrorBoundary>
  );

  return (
    <Drawer.Stack>
      <Drawer {...register(ADD_WIDGET_FORM_DRAWER_ID)} {...defaultDrawerProps}>
        <Divider />
        <Box mt={16}>
          {wrapInErrorBoundary(<SelectWidgetTypeComponent onSelect={handleSelectWidgetType} />)}
        </Box>
      </Drawer>

      <Drawer {...register(EDIT_WIDGET_FORM_DRAWER_ID)} {...defaultDrawerProps}>
        <Divider />
        <Box mt={16}>
          {wrapInErrorBoundary(
            <>
              {/* Only show back button on non-edit mode (when above drawer is first rendered)*/}
              {!isEditMode && (
                <Button
                  w="100%"
                  variant="default"
                  leftSection={<IconArrowBack />}
                  onClick={() => close(EDIT_WIDGET_FORM_DRAWER_ID)}>
                  Back to selection
                </Button>
              )}
              {/* TODO: Implement form */}
              <p>Dynamic edit form not implemented yet... {widgetState?.title}</p>
            </>,
          )}
        </Box>
      </Drawer>
    </Drawer.Stack>
  );
};

export default WidgetFormComponent;
