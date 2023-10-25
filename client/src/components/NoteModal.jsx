import { useState } from 'react';
import { HiX, HiCheck } from 'react-icons/hi';
import noteService from '../features/notes/noteService';

function NoteModal({ user, onUserChanged, onNoteModalClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    await noteService.createNote({ title: title, content: content });
    const notes = await noteService.retrieveNotes();
    onUserChanged({ ...user, notes: notes });
    onNoteModalClose();
  }

  return (
    <div className="note-modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <form method="" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              id="content"
              value={content}
              placeholder="content"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn-note-create" type="submit">
              <HiCheck />
            </button>
          </div>
        </form>
        <HiX className="close-modal" onClick={onNoteModalClose} />
      </div>
    </div>
  );
}

export default NoteModal;
