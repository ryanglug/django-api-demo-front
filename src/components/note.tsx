import { formatDate } from "@/lib/helpers";
import type { NoteType } from "@/types/api-types";

interface Props {
  note: NoteType;
}

const Note = ({ note }: Props) => {
  return (
    <div className="w-[400px] bg-gray-500/50 rounded-lg px-5 py-2">
      <div className="flex flex-col gap-2">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <span>{formatDate(note.created_at)}</span>
      </div>
    </div>
  );
};

export default Note;
