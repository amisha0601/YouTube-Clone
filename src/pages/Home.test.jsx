import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { vi } from "vitest";
import { describe, test, expect } from "vitest";

vi.mock("../components/Sidebar", () => ({
  default: ({ isSidebarOpen, category }) => (
    <div data-testid="mock-sidebar">
      <p>Sidebar is {isSidebarOpen ? "open" : "closed"}</p>
      <p>Category is: {category}</p>
    </div>
  ),
}));

describe("Home Component Test Cases", () => {
  test("should render Sidebar with sidebar=true", () => {
    render(<Home sidebar={true} />);

    const sidebar = screen.getByTestId("mock-sidebar");

    expect(sidebar).toBeInTheDocument();

    expect(sidebar).toHaveTextContent("Sidebar is open");

    expect(sidebar).toHaveTextContent("Category is: 0");
  });

  test("should render Sidebar with sidebar=false", () => {
    render(<Home sidebar={false} />);

    const sidebar = screen.getByTestId("mock-sidebar");

    expect(sidebar).toHaveTextContent("Sidebar is closed");

    expect(sidebar).toHaveTextContent("Category is: 0");
  });
});
