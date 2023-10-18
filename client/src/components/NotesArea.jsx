import Note from './Note';
import { useState, useRef, useEffect } from 'react';
import noteService from '../features/notes/noteService';

function NotesArea() {
  const [notes, setNotes] = useState([]);
  const makeNotesCalled = useRef(false);

  useEffect(() => {
    async function makeNotes() {
      for (let i = 1; i <= 20; ++i) {
        await noteService.createNote({
          title: `t${i}`,
          content: `c${i}leijrgnergberigybeleijrgnergberigybeleijrgnergberigybeleijrgnergberigybeleijrgnergberigybeleijrgnergberigybe`,
        });
      }
      const notes = await noteService.retrieveNotes();
      setNotes(notes);
    }

    if (!makeNotesCalled.current) {
      makeNotesCalled.current = true;
      makeNotes();
    }
  }, []);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note key={note.id} noteData={note} />
      ))}
    </div>
  );
}

export default NotesArea;
