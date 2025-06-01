export interface UserType {
  id: number;
  username: string;
}

export interface NoteType {
  id: number;
  title: string;
  content: string;
  author: UserType;

  created_at: string;
}
export interface NoteTypeQL {
  id: number;
  title: string;
  content: string;
  author: UserType;

  createdAt: string;
}
