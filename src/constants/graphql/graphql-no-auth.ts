export const GET_NOTES_QUERY = `
query GetNotes ($page : Int) {
  notes (page: $page){
    id
    title
    content
    author {
      id
      username
    }
  }
}
`;
