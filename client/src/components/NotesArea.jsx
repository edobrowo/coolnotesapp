import Note from './Note';

function NotesArea({ notes, view, onEditNote }) {
  const viewStyles = new Map([
    ['list', { gridTemplateColumns: `repeat(1, 1fr)` }],
    ['grid', { gridTemplateColumns: `repeat(3, 1fr)` }],
  ]);

  return (
    <div className="notes" style={viewStyles.get(view)}>
      {notes &&
        notes.map((note) => (
          <Note key={note.id} note={note} onEditNote={onEditNote} />
        ))}
    </div>
  );
}

export default NotesArea;
