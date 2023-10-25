import NotesArea from '../components/NotesArea';
import AddNoteModal from '../components/AddNoteModal';

function Dashboard({
  user,
  onUserChanged,
  onAddNoteModalClose,
  addNoteModalOpen,
}) {
  return (
    <div className="dashboard">
      <section className="content">
        <NotesArea notes={user.notes} view={user.view} />
      </section>
      {addNoteModalOpen && (
        <AddNoteModal
          user={user}
          onUserChanged={onUserChanged}
          onAddNoteModalClose={onAddNoteModalClose}
        />
      )}
    </div>
  );
}

export default Dashboard;
