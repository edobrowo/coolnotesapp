import { useState } from 'react';
import { HiX, HiCheck } from 'react-icons/hi';
import noteService from '../features/notes/noteService';

function AddNoteModal({ user, handleUserChanged, handleAddNoteModalClose }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleFormSubmit(e) {
    e.preventDefault();
    await noteService.createNote({ title: title, content: content });
    const notes = await noteService.retrieveNotes();
    handleUserChanged({ ...user, notes: notes });
    handleAddNoteModalClose();
  }

  return (
    <div className="add-note-modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <form onSubmit={(e) => handleFormSubmit(e)}>
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
        <HiX className="close-modal" onClick={handleAddNoteModalClose} />
      </div>
    </div>
  );
}

export default AddNoteModal;
