import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import noteService from './features/notes/noteService';

function App() {
  const [user, setUser] = useState({
    notes: [],
    view: 'list',
    theme: 'dark',
  });
  const [addNoteModalOpen, setaddNoteModalOpen] = useState(false);

  function openAddNoteModal() {
    setaddNoteModalOpen(true);
  }

  function closeAddNoteModal() {
    setaddNoteModalOpen(false);
  }

  const isDummyInitialized = useRef(false);

  useEffect(() => {
    async function makeUser() {
      for (let i = 1; i <= 20; ++i) {
        await noteService.createNote({
          title: `t${i}`,
          content: `c${i}`,
        });
      }

      const notes = await noteService.retrieveNotes();
      setUser({ ...user, notes: notes });
    }

    if (!isDummyInitialized.current) {
      isDummyInitialized.current = true;
      makeUser();
    }
  }, [user]);

  return (
    <>
      <Router>
        <div
          className={
            'container' + (user.theme === 'light' ? ' light-mode' : '')
          }
        >
          <Header
            user={user}
            handleUserChanged={setUser}
            handleaddNoteModalOpen={openAddNoteModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  user={user}
                  handleUserChanged={setUser}
                  handleAddNoteModalClose={closeAddNoteModal}
                  addNoteModalOpen={addNoteModalOpen}
                />
              }
            />
            <Route
              path="/login"
              element={<Login handleUserChanged={setUser} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
