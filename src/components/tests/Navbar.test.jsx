import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../Navbar";
import { vi } from "vitest";
import { describe, test, expect } from "vitest";

const renderNavbar = (props = {}) => {
  return render(
    <BrowserRouter>
      <Navbar
        setSidebar={() => {}}
        currentTheme={props.currentTheme || "light"}
        onThemeToggle={props.onThemeToggle || (() => {})}
      />
    </BrowserRouter>
  );
};

describe("Navbar Component", () => {
  test("should render logo, search input, and profile image", () => {
    renderNavbar();

    expect(screen.getByAltText(/YouTube/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();

    expect(screen.getByAltText(/user profile/i)).toBeInTheDocument();
  });

  test("should search input should update when typing", () => {
    renderNavbar();

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: "react" } });
    expect(searchInput.value).toBe("react");
  });

  test("should toggle button switches theme", () => {
    const mockToggle = vi.fn();
    renderNavbar({ onThemeToggle: mockToggle, currentTheme: "light" });

    const toggleButton = screen.getByLabelText(/switch to dark mode/i);
    fireEvent.click(toggleButton);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
