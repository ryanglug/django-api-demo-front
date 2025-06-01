import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "@/components/navbar";
import { vi, type MockedFunction } from "vitest";

import { useAuthStore } from "@/stores/auth-store";

vi.mock("@/stores/auth-store", () => {
  return {
    useAuthStore: vi.fn(),
  };
});

vi.mock("@/lib/api", () => ({
  tokenApi: () => ({
    get: () => Promise.resolve({ data: { username: "MockUser" } }),
  }),
}));

const RENDER = () => {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Navbar />
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("shows public routes when not logged in", () => {
    const mockedStore = useAuthStore as unknown as MockedFunction<
      typeof useAuthStore
    >;
    mockedStore.mockImplementation((selector: any) =>
      selector({
        accessToken: null,
        userInfo: null,
        setUser: vi.fn(),
      })
    );

    RENDER();

    expect(screen.queryByText("Login")).toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("shows private routes when logged in", async () => {
    const mockedStore = useAuthStore as unknown as MockedFunction<
      typeof useAuthStore
    >;
    const username = "NewUser";

    mockedStore.mockImplementation((selector: any) =>
      selector({
        accessToken: "fake-token",
        userInfo: { username },
        setUser: vi.fn(),
      })
    );
    RENDER();

    expect(await screen.findByText("Logout")).toBeInTheDocument();
    expect(await screen.findByText("Own Notes")).toBeInTheDocument();
    expect(screen.getByTestId("user-span").textContent).toBe(username);
  });
});
