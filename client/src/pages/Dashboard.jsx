import NotesArea from '../components/NotesArea';

function Dashboard({ user, handleUserChanged }) {
  return (
    <div className="dashboard">
      <section className="content">
        <NotesArea notes={user.notes} view={user.view} />
      </section>
    </div>
  );
}

export default Dashboard;
