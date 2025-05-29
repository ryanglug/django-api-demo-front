import { graphQLApi } from "@/lib/api";
import type { NoteTypeQL } from "@/types/api-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import ScrollContainer from "./scroll-container";
import { GET_NOTES_QUERY } from "@/constants/graphql/graphql-queries";
import NoteQL from "./note-ql";

const getNotes = async ({ pageParam = 1 }) => {
  try {
    const res = await graphQLApi.post("", {
      query: GET_NOTES_QUERY,
      variables: { page: pageParam },
    });

    const data = res.data.data.notes.notes;
    const hasNext = res.data.data.notes.hasNext;

    return {
      results: data as NoteTypeQL[],
      nextPage: hasNext ? pageParam + 1 : undefined,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Unable to get notes");
  }
};

const DjangoNoAuthGraphQL = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["graphql-notes"],
    queryFn: getNotes,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) return <div className="text-5xl">Loading...</div>;
  if (error) return <div className="text-5xl">{error.message}</div>;

  return (
    <div className="flex flex-col">
      <ScrollContainer
        className="flex flex-col gap-5 items-center h-[600px] overflow-y-scroll pr-5"
        callback={fetchNextPage}
        shouldCallback={!isFetchingNextPage && hasNextPage}
      >
        {data &&
          data.pages.map((page) =>
            page.results.map((note, i) => (
              <NoteQL key={`note-result-${i}`} note={note} />
            ))
          )}
      </ScrollContainer>

      {!hasNextPage && (
        <div className="font-medium mt-5 text-xl">
          No more notes to fetch...
        </div>
      )}
    </div>
  );
};

export default DjangoNoAuthGraphQL;
