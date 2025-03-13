import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Note {
  id: string;
  title: string;
  content?: string;
  createdAt?: string;
}

export const NotesGrid = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  return (
    <div className="p-4">
      <FABNewNoteForm onAddNote={addNote} />
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        <AnimatePresence>
          {notes.map((note) => (
            <motion.div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold">{note.title}</h2>
              {note.content && <p className="text-gray-600 mt-2">{note.content}</p>}
              <p className="text-xs text-gray-400 mt-2">{note.createdAt}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
export const FABNewNoteForm = ({ onAddNote }: { onAddNote: (note: Note) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.button
          key="fab"
          className="w-fit h-12 text-2xl text-center flex flex-col justify-center fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          +
        </motion.button>
      ) : (
        <motion.div
          key="form"
          className="fixed bottom-4 right-4 w-full max-w-md bg-white p-4 rounded-lg shadow-2xl flex flex-col gap-3"
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-black">Add a new note</h2>
          <NewNoteForm onAddNote={onAddNote} onClose={() => setIsOpen(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const NewNoteForm = ({ onAddNote, onClose }: { onAddNote: (note: Note) => void; onClose: () => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function addNewNote(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return console.log("Title cannot be empty!");

    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };

    onAddNote(newNote);
    setTitle("");
    setContent("");
    onClose();
  }

  return (
    <form onSubmit={addNewNote} className="w-full flex flex-col gap-3">
      <input 
        className="w-full p-2 border rounded" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        className="w-full p-2 border rounded" 
        placeholder="Description" 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
          Add Note
        </button>
        <button type="button" className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer hover:bg-gray-400" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

