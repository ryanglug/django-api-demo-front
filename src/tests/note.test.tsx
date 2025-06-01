import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Note from "@/components/note";

const BASE_NOTE = {
  id: 1,
  content: "Note content",
  title: "Note Title",
  author: {
    id: 1,
    username: "Fake User",
  },
  created_at: "fake-date",
  updated_at: "fake-date",
};

const mockNote = (overrides = {}) => ({ ...BASE_NOTE, ...overrides });

const RENDER = (
  note: any,
  isAuth = false,
  handleDelete?: (id: number) => void
) => {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Note note={note} isAuth={isAuth} handleDelete={handleDelete} />
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  it("handles not being given a title field", () => {
    RENDER(mockNote({ title: undefined }));

    expect(screen.getByText(/no title/i)).toBeInTheDocument();
  });
  it("handles not being given a content field", () => {
    RENDER(mockNote({ content: undefined }));

    expect(screen.getByText(/no content/i)).toBeInTheDocument();
  });

  it("handles not being given a author field", () => {
    RENDER(mockNote({ author: undefined }));

    expect(screen.queryByTestId("user-name")).not.toBeInTheDocument();
  });
  it("handles not being given a created_at field", () => {
    RENDER(mockNote({ created_at: undefined }));

    expect(screen.getByText(/invalid date/i)).toBeInTheDocument();
  });
  it("handles not being given a id field", () => {
    RENDER(mockNote({ id: undefined }), true, (id: number) => {
      console.log(id);
    });

    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);
  });
});
