import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

function App() {
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

  return (
    <>
      <Router>
        <div className={'container' + (theme === 'light' ? ' light-mode' : '')}>
          <Header
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
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
