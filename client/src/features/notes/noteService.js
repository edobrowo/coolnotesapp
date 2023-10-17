class Timestamp {
  constructor() {
    this.index = 0;
  }

  get() {
    return this.index++;
  }
}

const ts = new Timestamp();

class Note {
  constructor(noteData) {
    this.id = ts.get();
    this.title = noteData.title ? noteData.title : '';
    this.content = noteData.content ? noteData.content : '';
  }
}

const notes = [];

async function retrieveNotes() {
  return notes;
}

async function createNote(noteData) {
  const note = new Note(noteData);
  notes.push(note);
  return note.id;
}

async function removeNote(noteData) {
  const index = notes.findIndex((note) => note.id == noteData.id);
  if (index == -1) return -1;
  const note = notes.shift(index, 1);
  return note.id;
}

async function editNote(noteData) {
  const index = notes.findIndex((note) => note.id == noteData.id);
  if (index == -1) return -1;
  notes[index].title = noteData.title ? noteData.title : notes[index].title;
  notes[index].content = noteData.content
    ? noteData.content
    : notes[index].content;
  return notes[index].id;
}

const noteService = {
  createNote,
  retrieveNotes,
  removeNote,
  editNote,
};

export default noteService;
