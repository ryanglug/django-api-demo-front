import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import DjangoNoAuth from "@/components/django-no-auth";

import { useInfiniteQuery } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: vi.fn(),
}));

describe("Django API without authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("fetches more data on scrolling to bottom of container", () => {
    const mockData = { pages: [{ results: [], nextPage: 2 }] };

    for (let i = 0; i < 20; i++) {
      const newData = {
        id: i,
        content: `Mock Note ${i}`,
        title: `Mock Title ${i}`,
        author: { username: `Fake user ${i}` },
      };
      //@ts-expect-error No problem
      mockData.pages[0].results.push(newData);
    }

    const fetchNextPage = vi.fn();

    //@ts-expect-error No problem
    useInfiniteQuery.mockReturnValue({
      data: mockData,
      fetchNextPage,
      hasNextPage: true,
      isLoading: false,
      error: null,
      isFetchingNextPage: false,
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <DjangoNoAuth />
      </MemoryRouter>
    );

    expect(screen.getByText("Mock Title 0")).toBeInTheDocument();
    expect(screen.getByText("Mock Title 19")).toBeInTheDocument();

    const scrollContainer = screen.getByTestId("scroll-container");

    scrollContainer.scrollTop = scrollContainer.scrollHeight;
    scrollContainer.dispatchEvent(new Event("scroll"));

    expect(fetchNextPage).toHaveBeenCalledTimes(1);
  });
});
