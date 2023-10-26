import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState({});
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  function handleOpenNoteModal() {
    setNoteModalOpen(true);
  }

  function handleCloseNoteModal() {
    setNoteModalOpen(false);
  }

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
            onUserChanged={setUser}
            onNoteModalOpen={handleOpenNoteModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  user={user}
                  onUserChanged={setUser}
                  onNoteModalOpen={handleOpenNoteModal}
                  onNoteModalClose={handleCloseNoteModal}
                  noteModalOpen={noteModalOpen}
                />
              }
            />
            <Route path="/login" element={<Login onUserChanged={setUser} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
