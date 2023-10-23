import NotesArea from '../components/NotesArea';
import AddNoteModal from '../components/AddNoteModal';

function Dashboard({
  user,
  handleUserChanged,
  handleAddNoteModalClose,
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
          handleUserChanged={handleUserChanged}
          handleAddNoteModalClose={handleAddNoteModalClose}
        />
      )}
    </div>
  );
}

export default Dashboard;
