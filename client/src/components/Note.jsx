function Note({ noteData }) {
  return (
    <div className="note">
      <h3>{noteData.title}</h3>
      <p>{noteData.content}</p>
    </div>
  );
}

export default Note;
