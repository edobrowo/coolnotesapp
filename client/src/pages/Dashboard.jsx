import NotesArea from '../components/NotesArea';
import NoteModal from '../components/NoteModal';

function Dashboard({ user, onUserChanged, onNoteModalClose, NoteModalOpen }) {
  return (
    <div className="dashboard">
      <section className="content">
        <NotesArea notes={user.notes} view={user.view} />
      </section>
      {NoteModalOpen && (
        <NoteModal
          user={user}
          onUserChanged={onUserChanged}
          onNoteModalClose={onNoteModalClose}
        />
      )}
    </div>
  );
}

export default Dashboard;
