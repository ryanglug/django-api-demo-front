export interface UserType {
  id: string;
  username: string;
}

export interface NoteType {
  id: string;
  title: string;
  content: string;
  author: UserType;

  created_at: string;
  updated_at: string;
}
export interface NoteTypeQL {
  id: string;
  title: string;
  content: string;
  author: UserType;

  createdAt: string;
  updatedAt: string;
}
