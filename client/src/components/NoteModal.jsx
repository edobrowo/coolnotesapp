import { useState } from 'react';
import { HiTrash, HiX, HiCheck } from 'react-icons/hi';
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

  async function createNote() {
    await noteService.createNote({ title: title, content: content });
    const notes = await noteService.retrieveNotes();
    onUserChanged({ ...user, notes: notes });
  }

  async function editNote() {
    await noteService.editNote({
      id: noteData.id,
      title: title,
      content: content,
    });
    const notes = await noteService.retrieveNotes();
    onUserChanged({ ...user, notes: notes });
  }

  async function removeNote() {
    await noteService.removeNote(noteData);
    const notes = await noteService.retrieveNotes();
    onUserChanged({ ...user, notes: notes });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (noteData) {
      await editNote(noteData);
    } else {
      await createNote(noteData);
    }
    clearEditedNote();
    onNoteModalClose();
  }

  function handleNoteModalClose() {
    clearEditedNote();
    onNoteModalClose();
  }

  async function handleRemoveNote(e) {
    e.preventDefault();
    await removeNote();
    clearEditedNote();
    onNoteModalClose();
  }

  return (
    <div className="note-modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <div className="modal-top-bar">
          {noteData && (
            <HiTrash className="delete-note" onClick={handleRemoveNote} />
          )}
          <HiX className="close-modal" onClick={handleNoteModalClose} />
        </div>
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
      </div>
    </div>
  );
}

export default NoteModal;
