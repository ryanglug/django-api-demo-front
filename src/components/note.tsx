import { formatDate } from "@/lib/helpers";
import type { NoteType } from "@/types/api-types";

interface Props {
  note: NoteType;
  isAuth?: boolean;
  handleDelete?: (id: string) => void;
}

const Note = ({ note, isAuth = false, handleDelete }: Props) => {
  return (
    <div className="w-[600px] bg-gray-500/50 rounded-lg px-5 py-2">
      <div className="flex flex-col">
        <h3 className="font-medium underline text-2xl mb-3">{note.title}</h3>
        <p className="text-xl mb-2">{note.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm">{formatDate(note.created_at)}</span>
          <span className="text-sm">
            By: <span className="italic">{note.author.username}</span>
          </span>
        </div>
        {isAuth && handleDelete && (
          <button
            className="bg-red-500 px-2 py-1 text-base rounded-lg self-start hover:brightness-75 transition hover:cursor-pointer mt-3"
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
