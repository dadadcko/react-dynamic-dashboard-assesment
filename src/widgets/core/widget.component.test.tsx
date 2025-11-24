import { renderWithMantine } from "@/setup-tests.ts";
import { Widget as WidgetComponent } from "@/widgets/core/widget.component.tsx";
import type { Widget } from "@/widgets/core/widget.type.ts";
import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import { type WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import { beforeEach, expect, type Mock } from "vitest";
import { screen } from "@testing-library/react";

describe("Widget component", () => {
  let testingWidget: Widget;
  let testProvider: WidgetDynamicTypeProvider;

  beforeEach(() => {
    testingWidget = {
      id: "test-widget",
      type: "core/test",
      title: "Test Widget",
      description: "A widget for testing purposes",
      render: vi.fn(),
    };

    testProvider = {
      mapper: _ => testingWidget,
      createNew: () => testingWidget,
      form: {} as never,
      metadata: {} as never,
    };
  });

  it("should render error fallback component, when widget rendering fails", async () => {
    // Mock the provider's render method to throw an error
    (testingWidget.render as Mock<Widget["render"]>).mockImplementation(() => {
      throw new Error("Rendering failed");
    });

    renderWithMantine(
      <WidgetDynamicTypeContextProvider dynamicWidgetTypeProvider={testProvider}>
        <WidgetComponent config={testingWidget} />
      </WidgetDynamicTypeContextProvider>,
    );

    const errorMessage = await screen.findByText("Error while rendering Widget");

    expect(errorMessage).toBeInTheDocument();
  });
});
