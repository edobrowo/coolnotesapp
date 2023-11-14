import { useState } from 'react';
import { HiTrash, HiX, HiCheck } from 'react-icons/hi';
import noteService from '../features/notes/noteService';

function NoteModal({
  openedNote,
  notes,
  onNotesChanged,
  onNoteModalClose,
  clearOpenedNote,
  user,
}) {
  const [title, setTitle] = useState(openedNote ? openedNote.title : '');
  const [content, setContent] = useState(openedNote ? openedNote.content : '');

  async function createNote() {
    const createdNote = await noteService.createNote(
      {
        title: title,
        content: content,
      },
      user.token
    );
    onNotesChanged(
      notes.concat([
        {
          _id: createdNote._id,
          title: createdNote.title,
          content: createdNote.content,
        },
      ])
    );
  }

  async function editNote() {
    const editedNote = await noteService.editNote(
      { _id: openedNote._id, title: title, content: content },
      user.token
    );
    const index = notes.findIndex((note) => note._id === openedNote._id);
    notes[index] = {
      _id: editedNote._id,
      title: editedNote.title,
      content: editedNote.content,
    };
    onNotesChanged(notes);
  }

  async function removeNote() {
    const removedNote = await noteService.removeNote(
      openedNote._id,
      user.token
    );
    const index = notes.findIndex((note) => note._id === removedNote._id);
    notes.splice(index, 1);
    onNotesChanged(notes);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (openedNote) {
      await editNote();
    } else {
      await createNote();
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
