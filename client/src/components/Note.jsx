function Note({ noteData, onEditNote }) {
  return (
    <div className="note" onClick={() => onEditNote(noteData)}>
      <h3>{noteData.title}</h3>
      <p>{noteData.content}</p>
    </div>
  );
}

export default Note;
