import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderWithMantine } from "./setup-tests.ts";

import App from "./App";

describe("App Component", () => {
  it("renders correctly", () => {
    const component = renderWithMantine(<App />);

    expect(component.getByText(/count is 0/i)).toBeInTheDocument();
  });

  it("increments the count when the increment button is clicked", async () => {
    const component = renderWithMantine(<App />);

    const incrementButton = screen.getByText(/count is/i);
    await userEvent.click(incrementButton);

    expect(component.getByText(/count is 1/i)).toBeInTheDocument();
  });
});
