import { useState } from 'react';
import NotesArea from '../components/NotesArea';
import NoteModal from '../components/NoteModal';

function Dashboard({
  notes,
  onNotesChanged,
  view,
  onNoteModalOpen,
  onNoteModalClose,
  noteModalOpen,
}) {
  const [openedNote, setOpenedNote] = useState(null);

  function handleEditNote(note) {
    setOpenedNote(note);
    onNoteModalOpen();
  }

  return (
    <div className="dashboard">
      <section className="content">
        <NotesArea notes={notes} view={view} onEditNote={handleEditNote} />
      </section>
      {noteModalOpen && (
        <NoteModal
          openedNote={openedNote}
          notes={notes}
          onNotesChanged={onNotesChanged}
          onNoteModalClose={onNoteModalClose}
          clearOpenedNote={() => setOpenedNote(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
