import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import noteService from './features/notes/noteService';

function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('grid');
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  function handleOpenNoteModal() {
    setNoteModalOpen(true);
  }

  function handleCloseNoteModal() {
    setNoteModalOpen(false);
  }

  async function handleUserChanged(user) {
    setUser(user);
    let userNotes = [];

    if (user) {
      userNotes = await noteService.retrieveNotes(user.token);
    }

    setNotes(userNotes);
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      handleUserChanged(storedUser);
    }
  }, []);

  return (
    <>
      <Router>
        <div className={'container' + (theme === 'light' ? ' light-mode' : '')}>
          <Header
            user={user}
            onUserChanged={setUser}
            theme={theme}
            onThemeChanged={setTheme}
            view={view}
            onViewChanged={setView}
            onNoteModalOpen={handleOpenNoteModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  user={user}
                  notes={notes}
                  onNotesChanged={setNotes}
                  view={view}
                  onViewChanged={setView}
                  onNoteModalOpen={handleOpenNoteModal}
                  onNoteModalClose={handleCloseNoteModal}
                  noteModalOpen={noteModalOpen}
                />
              }
            />
            <Route
              path="/auth"
              element={<Auth user={user} onUserChanged={handleUserChanged} />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
