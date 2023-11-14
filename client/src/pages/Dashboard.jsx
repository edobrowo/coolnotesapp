import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NotesArea from '../components/NotesArea';
import NoteModal from '../components/NoteModal';

function Dashboard({
  user,
  notes,
  onNotesChanged,
  view,
  onNoteModalOpen,
  onNoteModalClose,
  noteModalOpen,
}) {
  const [openedNote, setOpenedNote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      onNotesChanged([]);
      navigate('/auth');
    }
  }, [user, navigate, onNotesChanged]);

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
          user={user}
        />
      )}
    </div>
  );
}

export default Dashboard;
