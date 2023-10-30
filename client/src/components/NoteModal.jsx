import { useState } from 'react';
import { HiTrash, HiX, HiCheck } from 'react-icons/hi';
import noteService from '../features/notes/noteService';

function NoteModal({
  openedNote,
  notes,
  onNotesChanged,
  onNoteModalClose,
  clearOpenedNote,
}) {
  const [title, setTitle] = useState(openedNote ? openedNote.title : '');
  const [content, setContent] = useState(openedNote ? openedNote.content : '');

  async function createNote() {
    const id = await noteService.createNote({ title: title, content: content });
    // validate
    onNotesChanged(notes.concat([{ id: id, title: title, content: content }]));
  }

  async function editNote() {
    await noteService.editNote(openedNote);
    // validate
    const index = notes.findIndex((note) => note.id === openedNote.id);
    notes[index] = { id: openedNote.id, title: title, content: content };
    onNotesChanged(notes);
  }

  async function removeNote() {
    await noteService.removeNote(openedNote);
    // validate
    const index = notes.findIndex((note) => note.id === openedNote.id);
    notes.splice(index, 1);
    onNotesChanged(notes);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (openedNote) {
      await editNote(openedNote);
    } else {
      await createNote(openedNote);
    }
    clearOpenedNote();
    onNoteModalClose();
  }

  function handleNoteModalClose() {
    clearOpenedNote();
    onNoteModalClose();
  }

  async function handleRemoveNote(e) {
    e.preventDefault();
    await removeNote();
    clearOpenedNote();
    onNoteModalClose();
  }

  return (
    <div className="note-modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <div className="modal-top-bar">
          {openedNote && (
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
