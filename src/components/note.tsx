import { formatDate } from "@/lib/helpers";
import type { NoteType } from "@/types/api-types";

interface Props {
  note: NoteType;
  canDelete?: boolean;
  handleDelete?: (id: string) => void;
}

const Note = ({ note, canDelete = false, handleDelete }: Props) => {
  return (
    <div className="w-[400px] bg-gray-500/50 rounded-lg px-5 py-2">
      <div className="flex flex-col gap-2">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <span>{formatDate(note.created_at)}</span>
        <span>Created By: {note.author.username}</span>
        {canDelete && handleDelete && (
          <button
            className="bg-red-500 p-2 rounded-lg self-start hover:brightness-75 transition hover:cursor-pointer"
            onClick={() => handleDelete(note.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Note;
