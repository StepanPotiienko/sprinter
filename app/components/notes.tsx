import { useState } from "react";

interface Note {
  id: string;
  title: string;
  content?: string;
  createdAt?: string;
}

export const NewNoteForm = ({ onAddNote }: { onAddNote: (note: Note) => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addNewNote(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) console.log("Title cannot be empty!");
    
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content: "Hello World!",
      createdAt: new Date().toLocaleString(),
    };

    onAddNote(newNote);
    setTitle("");
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-3 justify-center items-center rounded-2xl shadow-2xl p-3">
      <h2 className="text-2xl font-black">Add a new note</h2>
      <form onSubmit={addNewNote} className="w-full flex flex-col gap-3">
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Today was pretty eventful day..." 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <input 
          className="w-full p-2 border rounded" 
          placeholder="Neat description" 
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Note</button>
      </form>
    </div>
  );
};

const Note = ({ title, content, createdAt }: Note) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{title}</h1>
      {content && <p className="text-gray-600">{content}</p>}
      <p className="text-sm text-gray-500">{createdAt}</p>
    </div>
  );
};

export const NotesList = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Note 1", content: "This is the content of note 1" },
    { id: "2", title: "Note 2", content: "This is the content of note 2" },
  ]);

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-3">
      <NewNoteForm onAddNote={addNote} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </div>
    </div>
  );
};
