import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { describe, test, expect } from "vitest";

describe("App component rendering", () => {
  test("should render the App component without any error", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const homeTextElement = screen.getByText(/home/i);

    expect(homeTextElement).toBeInTheDocument();
  });

  test("should show the Navbar with search input on page load", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();
  });

  test("should apply theme class to the body tag", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const body = document.body;
    const hasLight = body.classList.contains("light");
    const hasDark = body.classList.contains("dark");

    expect(hasLight || hasDark).toBe(true);
  });
});
