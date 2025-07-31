import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import PlayVideo from "../PlayVideo";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn((url) => {
      if (url.includes("videos")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              items: [
                {
                  id: "abcd1234",
                  snippet: {
                    title: "My First Video",
                    channelTitle: "CodeWithAmisha",
                    description: "This is a description test.",
                    publishedAt: "2025-07-30",
                  },
                  statistics: {
                    viewCount: "500",
                    likeCount: "50",
                  },
                },
              ],
            }),
        });
      }

      if (url.includes("commentThreads")) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              items: [
                {
                  id: "comment1",
                  snippet: {
                    topLevelComment: {
                      snippet: {
                        authorDisplayName: "User06",
                        textDisplay: "Great video!",
                        publishedAt: "2025-07-30",
                      },
                    },
                  },
                },
              ],
            }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      });
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("PlayVideo component", () => {
  test("should render the video title", async () => {
    render(
      <MemoryRouter initialEntries={["/video/4/abcd1234"]}>
        <Routes>
          <Route path="/video/:categoryId/:videoId" element={<PlayVideo />} />
        </Routes>
      </MemoryRouter>
    );

    const title = await screen.findByText("My First Video");
    expect(title).toBeInTheDocument();
  });

  test("should render the channel name", async () => {
    render(
      <MemoryRouter initialEntries={["/video/4/abcd1234"]}>
        <Routes>
          <Route path="/video/:categoryId/:videoId" element={<PlayVideo />} />
        </Routes>
      </MemoryRouter>
    );

    const channel = await screen.findByText("CodeWithAmisha");
    expect(channel).toBeInTheDocument();
  });

  test("should display the view count", async () => {
    render(
      <MemoryRouter initialEntries={["/video/4/abcd1234"]}>
        <Routes>
          <Route path="/video/:categoryId/:videoId" element={<PlayVideo />} />
        </Routes>
      </MemoryRouter>
    );

    const viewCount = await screen.findByText(/500 views/i);
    expect(viewCount).toBeInTheDocument();
  });

  test("should display a comment", async () => {
    render(
      <MemoryRouter initialEntries={["/video/4/abcd1234"]}>
        <Routes>
          <Route path="/video/:categoryId/:videoId" element={<PlayVideo />} />
        </Routes>
      </MemoryRouter>
    );

    const comment = await screen.findByText("Great video!");
    expect(comment).toBeInTheDocument();
  });
});
