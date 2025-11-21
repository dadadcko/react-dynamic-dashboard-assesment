import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "./App";

describe("App Component", () => {
  it("renders correctly", () => {
    const component = render(<App />);

    expect(component.getByText(/count is 0/i)).toBeInTheDocument();
  });

  it("increments the count when the increment button is clicked", async () => {
    const component = render(<App />);

    const incrementButton = screen.getByText(/count is/i);
    await userEvent.click(incrementButton);

    expect(component.getByText(/count is 1/i)).toBeInTheDocument();
  });
});
