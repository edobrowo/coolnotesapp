function Note({ note, onEditNote }) {
  return (
    <div className="note" onClick={() => onEditNote(note)}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </div>
  );
}

export default Note;
