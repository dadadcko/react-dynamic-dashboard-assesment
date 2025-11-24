import { renderWithMantine } from "@/setup-tests.ts";
import { Widget as WidgetComponent } from "@/widgets/core/widget.component.tsx";
import type { Widget, WidgetActions, WidgetConfig } from "@/widgets/core/widget.type.ts";
import { WidgetDynamicTypeContextProvider } from "@/widgets/core/context.provider.tsx";
import { WidgetActionsContext, type WidgetDynamicTypeProvider } from "@/widgets/core/context.ts";
import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

    testProvider = createProvider(testingWidget);
  });

  const createProvider = (widget: Widget): WidgetDynamicTypeProvider => ({
    mapper: vi.fn(_ => widget),
    createNew: () => widget,
    form: {} as never,
    metadata: {} as never,
  });

  const renderWidgetWithProviders = (wc: WidgetConfig, ...providers: WidgetDynamicTypeProvider[]) =>
    renderWithMantine(
      // Nest multiple providers if given - reduce them from right to maintain order
      providers.reduceRight(
        (children, provider) => (
          <WidgetDynamicTypeContextProvider dynamicWidgetTypeProvider={provider}>
            {children}
          </WidgetDynamicTypeContextProvider>
        ),
        <WidgetComponent config={wc} />,
      ),
    );

  it("should render error fallback component, when widget rendering fails", async () => {
    // Mock the provider's render method to throw an error
    (testingWidget.render as Mock<Widget["render"]>).mockImplementation(() => {
      throw new Error("Rendering failed");
    });

    renderWidgetWithProviders(testingWidget, testProvider);

    const errorMessage = await screen.findByText("Error while rendering Widget");

    expect(errorMessage).toBeInTheDocument();
  });

  it("should render widget with title, description, and content from provider", async () => {
    // Mock successful render
    (testingWidget.render as Mock<Widget["render"]>).mockReturnValue(
      <div role="region" aria-label="widget-content">
        Test Widget Content
      </div>,
    );

    renderWidgetWithProviders(testingWidget, testProvider);

    // Assert title appears as heading
    const title = screen.getByRole("heading", { name: testingWidget.title });
    expect(title).toBeInTheDocument();

    // Assert description appears
    const description = screen.getByText(testingWidget.description!);
    expect(description).toBeInTheDocument();

    // Assert widget content renders
    const content = await screen.findByRole("region", { name: "widget-content" });
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Test Widget Content");

    // Assert render was called
    expect(testingWidget.render).toHaveBeenCalled();
  });

  it("should render widget without description when not provided", async () => {
    const widgetWithoutDescription: Widget = { ...testingWidget };
    delete widgetWithoutDescription.description;

    // Mock successful render
    (testingWidget.render as Mock<Widget["render"]>).mockReturnValue(
      <div role="region" aria-label="widget-content">
        Simple Content
      </div>,
    );

    renderWidgetWithProviders(widgetWithoutDescription, createProvider(widgetWithoutDescription));

    // Assert title appears
    const title = screen.getByRole("heading", { name: widgetWithoutDescription.title });
    expect(title).toBeInTheDocument();

    // Assert no description text
    const description = screen.queryByText(/description/i);
    expect(description).not.toBeInTheDocument();

    // Assert content still renders
    const content = await screen.findByRole("region");
    expect(content).toHaveTextContent("Simple Content");
  });

  it("should use second provider when first mapper returns null", async () => {
    const firstProvider: WidgetDynamicTypeProvider = {
      ...testProvider,
      mapper: vi.fn(() => null),
    };

    (testingWidget.render as Mock<Widget["render"]>).mockReturnValue(
      <div role="region" aria-label={testingWidget.title}>
        Second Provider Content
      </div>,
    );

    renderWidgetWithProviders(testingWidget, testProvider, firstProvider);

    // Assert second provider's content appears
    const content = await screen.findByRole("region", { name: testingWidget.title });
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Second Provider Content");

    // Assert first provider's content does not appear
    const firstContent = screen.queryByText("First Provider Content");
    expect(firstContent).not.toBeInTheDocument();

    // Assert mapper was called on both providers
    expect(firstProvider.mapper).toHaveBeenCalled();
    expect(testProvider.mapper).toHaveBeenCalled();
  });

  it("should render unknown widget fallback when no provider handles the config", async () => {
    const config: WidgetConfig = {
      ...testingWidget,
      type: "69420",
    };

    // Render without custom providers - only default unknown provider available
    renderWithMantine(<WidgetComponent config={config} />);

    // Assert unknown widget message appears
    const unsupportedMessage = await screen.findByText(/Unsupported widget type/i);
    expect(unsupportedMessage).toBeInTheDocument();

    // Assert the original type is shown
    const typeInfo = screen.getByText(/"69420"/);
    expect(typeInfo).toBeInTheDocument();

    // Assert the additional context message
    const contextMessage = screen.getByText(
      /This widget cannot be rendered, its type is not recognized by the system/i,
    );
    expect(contextMessage).toBeInTheDocument();
  });

  it("should render async widget content when it becomes available", async () => {
    // Track promise state to ensure content only appears after resolution
    let resolvePromise: () => void;
    let promiseResolved = false;
    const loadingPromise = new Promise<void>(resolve => {
      resolvePromise = () => {
        promiseResolved = true;
        resolve();
      };
    });

    // Create a component that suspends until promise is resolved
    const AsyncContent = () => {
      if (!promiseResolved) {
        // Keep suspending until promise is explicitly resolved
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw loadingPromise;
      }
      return (
        <div role="region" aria-label="async-content">
          Async Loaded Content
        </div>
      );
    };

    const asyncWidget: Widget = {
      ...testingWidget,
      title: "Async Widget",
      render: vi.fn(() => <AsyncContent />),
    };

    renderWidgetWithProviders(asyncWidget, createProvider(asyncWidget));

    // Assert widget header appears immediately
    expect(screen.getByRole("heading", { name: asyncWidget.title })).toBeInTheDocument();

    // Content should not be present before resolving promise
    expect(screen.queryByRole("region", { name: "async-content" })).not.toBeInTheDocument();

    // Resolve the promise to load content
    resolvePromise!();

    // Verify that the async content appears after promise resolution
    const content = await screen.findByRole("region", { name: "async-content" });
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("Async Loaded Content");
  });

  it("should show retry button and increment retry count on error, then recover on retry", async () => {
    const user = userEvent.setup();

    const flakeyWidget: Widget = {
      ...testingWidget,
      render: vi.fn(() => {
        throw new Error("Intentional render error");
      }),
    };

    renderWidgetWithProviders(flakeyWidget, createProvider(flakeyWidget));

    // Assert error message appears (first attempt, no retry count)
    const errorMessage = await screen.findByText("Error while rendering Widget");
    expect(errorMessage).toBeInTheDocument();

    // Assert error details
    const errorDetails = screen.getByText("Intentional render error");
    expect(errorDetails).toBeInTheDocument();

    // Assert Try again button appears
    const retryButton = screen.getByRole("button", { name: /Try again/i });
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).not.toBeDisabled();

    // Fix the render to succeed on next attempt
    (flakeyWidget.render as Mock<Widget["render"]>).mockReturnValue(
      <div role="region">Recovered Content</div>,
    );

    // Click retry button
    await user.click(retryButton);

    // Assert content appears after retry
    const content = await screen.findByRole("region");
    expect(content).toHaveTextContent("Recovered Content");

    // Assert error message disappears
    const errorMessageAfter = await screen.findByText(
      "Error while rendering Widget",
      {},
      {
        timeout: 500,
        onTimeout: vi.fn(),
      },
    );
    expect(errorMessageAfter).not.toBeInTheDocument();

    // Assert render was called at least twice (initial + retry, may be more due to React internals)
    expect(
      (flakeyWidget.render as Mock<Widget["render"]>).mock.calls.length,
    ).toBeGreaterThanOrEqual(2);
  });

  it("should show retry count when error persists after first retry", async () => {
    const user = userEvent.setup();

    const alwaysFailWidget: Widget = {
      ...testingWidget,
      render: vi.fn(() => {
        throw new Error("Persistent render error");
      }),
    };

    renderWidgetWithProviders(alwaysFailWidget, createProvider(alwaysFailWidget));

    // Assert initial error (no retry count)
    const errorMessage = await screen.findByText("Error while rendering Widget");
    expect(errorMessage).toBeInTheDocument();

    // Click retry button
    const retryButton = screen.getByRole("button", { name: /Try again/i });
    await user.click(retryButton);

    // Assert error message now shows retry count (2x)
    const errorMessageWithRetry = await screen.findByText(/Error while rendering Widget \(2x\)/i);
    expect(errorMessageWithRetry).toBeInTheDocument();

    // Assert retry button still appears and is enabled
    const retryButtonAfter = screen.getByRole("button", { name: /Try again/i });
    expect(retryButtonAfter).toBeInTheDocument();
    expect(retryButtonAfter).not.toBeDisabled();
  });

  it("should disable retry button after max retries", async () => {
    const user = userEvent.setup();

    const alwaysFailWidget: Widget = {
      ...testingWidget,
      render: vi.fn(() => {
        throw new Error("Max retries error");
      }),
    };

    renderWidgetWithProviders(alwaysFailWidget, createProvider(alwaysFailWidget));

    // Initial error
    await screen.findByText("Error while rendering Widget");

    // First retry
    let retryButton = screen.getByRole("button", { name: /Try again/i });
    await user.click(retryButton);
    await screen.findByText(/Error while rendering Widget \(2x\)/i);

    // Second retry
    retryButton = screen.getByRole("button", { name: /Try again/i });
    await user.click(retryButton);
    await screen.findByText(/Error while rendering Widget \(3x\)/i);

    // Assert button is now disabled (default maxRetries is 2, so after 3 attempts it's disabled)
    retryButton = screen.getByRole("button", { name: /Try again/i });
    expect(retryButton).toBeDisabled();
  });

  describe("Widget settings menu button", () => {
    const render = (actions: WidgetActions) =>
      renderWithMantine(
        <WidgetDynamicTypeContextProvider dynamicWidgetTypeProvider={testProvider}>
          <WidgetActionsContext.Provider value={actions}>
            <WidgetComponent config={testingWidget} />
          </WidgetActionsContext.Provider>
        </WidgetDynamicTypeContextProvider>,
      );

    beforeEach(() => {
      (testingWidget.render as Mock<Widget["render"]>).mockReturnValue(
        <div role="region">Content</div>,
      );
    });

    it("should be rendered in widget header when at least one action is provided", async () => {
      render({ onSave: vi.fn() });

      // Assert settings menu button appears (ActionIcon with correct aria-label)
      const menuButton = await screen.findByRole("button", { name: /Open settings for widget/i });
      expect(menuButton).toBeInTheDocument();
    });

    it("should not be rendered when no actions are provided", () => {
      render({});

      // Assert settings menu button does NOT appear when no actions context provided
      const menuButton = screen.queryByRole("button", { name: /Open settings for widget/i });
      expect(menuButton).not.toBeInTheDocument();
    });
  });
});
