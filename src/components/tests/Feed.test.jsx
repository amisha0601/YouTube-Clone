import { render, screen, waitFor } from "@testing-library/react";
import Feed from "../Feed";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { describe, beforeEach, expect, test, afterEach } from "vitest";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            items: [
              {
                id: "abcd1234",
                snippet: {
                  categoryId: "4",
                  title: "My First Video",
                  channelTitle: "CodeWithAmisha",
                  thumbnails: {
                    medium: {
                      url: "https://image.com/thumbnail.jpg",
                    },
                  },
                  publishedAt: "2025-07-30",
                },
                statistics: {
                  viewCount: "100",
                },
              },
            ],
          }),
      })
    )
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Feed component test", () => {
  test(" should render Feed component and displays video title", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    const titleElement = await waitFor(() =>
      screen.getByText("My First Video")
    );
    expect(titleElement).toBeInTheDocument();
  });

  test(" should show channel title correctly", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    const channelElement = await waitFor(() =>
      screen.getByText("CodeWithAmisha")
    );
    expect(channelElement).toBeInTheDocument();
  });

  test("should display video thumbnail image", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    );

    const image = await waitFor(() =>
      screen.getByRole("img", { name: /My First Video/i })
    );
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://image.com/thumbnail.jpg");
  });

  test("should have a link to video details page", async () => {
    render(
      <BrowserRouter>
        <Feed category="0" />
      </BrowserRouter>
    );

    const link = await waitFor(() => screen.getByRole("link"));
    expect(link).toHaveAttribute("href", "/video/4/abcd1234");
  });
});
