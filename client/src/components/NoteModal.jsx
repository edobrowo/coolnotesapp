import { useState } from 'react';
import { HiX, HiCheck } from 'react-icons/hi';
import noteService from '../features/notes/noteService';

function NoteModal({
  user,
  onUserChanged,
  onNoteModalClose,
  noteData,
  clearEditedNote,
}) {
  const [title, setTitle] = useState(noteData ? noteData.title : '');
  const [content, setContent] = useState(noteData ? noteData.content : '');

  async function handleCreateNote() {
    await noteService.createNote({ title: title, content: content });
    const notes = await noteService.retrieveNotes();
    onUserChanged({ ...user, notes: notes });
  }

  async function handleEditNote() {
    await noteService.editNote({
      id: noteData.id,
      title: title,
      content: content,
    });
    const notes = await noteService.retrieveNotes();
    onUserChanged({ ...user, notes: notes });
    clearEditedNote();
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (noteData) {
      await handleEditNote(noteData);
    } else {
      await handleCreateNote(noteData);
    }
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
