import { api } from "@/lib/api";
import type { NoteType } from "@/types/api-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import Note from "./note";
import ScrollContainer from "./scroll-container";

const getNotes = async ({ pageParam = 1 }) => {
  try {
    const res = await api.get("note/", { params: { page: pageParam } });

    return {
      results: res.data.results as NoteType[],
      nextPage: res.data.next ? pageParam + 1 : undefined,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Unable to get notes");
  }
};

const DjangoNoAuth = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) return <div className="text-5xl">Loading...</div>;
  if (error) return <div className="text-5xl">{error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2>All Paginated Notes:</h2>
      <ScrollContainer
        className="flex flex-col gap-5 items-center h-[400px] overflow-y-scroll pr-10"
        callback={fetchNextPage}
        shouldCallback={!isFetchingNextPage && hasNextPage}
      >
        {data &&
          data.pages.map((page) =>
            page.results.map((note, i) => (
              <Note key={`note-result-${i}`} note={note} />
            ))
          )}
      </ScrollContainer>

      {!hasNextPage && <div>No more notes to fetch...</div>}
    </div>
  );
};

export default DjangoNoAuth;
