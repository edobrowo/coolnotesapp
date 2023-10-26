import { useState } from 'react';
import NotesArea from '../components/NotesArea';
import NoteModal from '../components/NoteModal';

function Dashboard({
  user,
  onUserChanged,
  onNoteModalOpen,
  onNoteModalClose,
  noteModalOpen,
}) {
  const [editedNote, setEditedNote] = useState(null);

  function handleEditNote(noteData) {
    setEditedNote(noteData);
    onNoteModalOpen();
  }

  return (
    <div className="dashboard">
      <section className="content">
        <NotesArea
          notes={user.notes}
          view={user.view}
          onEditNote={(noteData) => handleEditNote(noteData)}
        />
      </section>
      {noteModalOpen && (
        <NoteModal
          user={user}
          onUserChanged={onUserChanged}
          onNoteModalClose={onNoteModalClose}
          noteData={editedNote}
          clearEditedNote={() => setEditedNote(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
