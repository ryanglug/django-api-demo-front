import { graphQLTokenApi } from "@/lib/api";
import type { NoteTypeQL } from "@/types/api-types";
import { useInfiniteQuery } from "@tanstack/react-query";
import ScrollContainer from "./scroll-container";
import { GET_USERS_NOTES_QUERY } from "@/constants/graphql/graphql-no-auth";
import NoteQL from "./note-ql";
import { useAuthStore } from "@/stores/auth-store";

const getNotes = async (accessToken: string, { pageParam = 1 }) => {
  try {
    const res = await graphQLTokenApi(accessToken).post("", {
      query: GET_USERS_NOTES_QUERY,
      variables: { page: pageParam },
    });

    const data = res.data.data.userNotes;
    const hasNext = data?.length === 5;

    return {
      results: data as NoteTypeQL[],
      nextPage: hasNext ? pageParam + 1 : undefined,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Unable to get notes");
  }
};

const DjangoAuthGraphQL = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["auth-graphql-notes"],
    queryFn: ({ pageParam }) => getNotes(accessToken!, { pageParam }),
    enabled: !!accessToken,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) return <div className="text-5xl">Loading...</div>;
  if (error) return <div className="text-5xl">{error.message}</div>;

  return (
    <div className="flex flex-col gap-4">
      <h2>Paginated Notes from GraphQL:</h2>
      <ScrollContainer
        className="flex flex-col gap-5 items-center h-[400px] overflow-y-scroll pr-10"
        callback={fetchNextPage}
        shouldCallback={!isFetchingNextPage && hasNextPage}
      >
        {data &&
          data.pages.map((page) =>
            page.results.map((note, i) => (
              <NoteQL
                key={`note-result-${i}`}
                note={note}
                canDelete
                handleDelete={() => {}}
              />
            ))
          )}
      </ScrollContainer>

      {!hasNextPage && <div>No more notes to fetch...</div>}
    </div>
  );
};

export default DjangoAuthGraphQL;
