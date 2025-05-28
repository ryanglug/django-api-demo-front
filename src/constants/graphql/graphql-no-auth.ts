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

export const GET_USERS_NOTES_QUERY = `
query GetUserNotes ($page : Int) {
  userNotes (page: $page) {
		id
    title
    content
    createdAt
    author {
      id
      username
    }
  }
}
`;
