export const GET_NOTES_QUERY = `
query GetNotes ($page : Int) {
  notes (page: $page){
    notes {
			id
    title
    content
    author {
      id
      username
    }
    createdAt
    }
    hasNext
  }
}
`;

export const GET_USERS_NOTES_QUERY = `
query GetUsersNotes ($page : Int) {
   userNotes(page: $page){
    notes {
			id
    title
    content
    author {
      id
      username
    }
    createdAt
    }
    hasNext
  }
}
`;

export const CREATE_NOTE_MUTATION = `
mutation CreateNote($title: String!, $content: String!){
  createNote(title: $title, content: $content) {
		note {
      id
      title
      content
      createdAt
    }
  }
}
`;

export const DELETE_NOTE_MUTATION = `
mutation DeleteNote($noteId: ID!){
  deleteNote(noteId: $noteId) {
    success
  }
}
`;
