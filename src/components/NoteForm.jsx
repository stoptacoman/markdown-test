export default function NoteForm(props) {
  return (
    <section className="note-create">
      <form onSubmit={(e) => props.createNote(e)}>
        <div className="form-field">
          <label htmlFor="noteTitle">Title</label>
          <input
            type="text"
            onChange={(e) => props.handleTitleChange(e)}
            value={props.noteTitle}
          />
        </div>
        <div className="form-field">
          <label htmlFor="markdownTextArea">Type the markdown here</label>
          <textarea
            cols="100"
            rows="15"
            onChange={(e) => props.handleNotePreview(e)}
            value={props.noteContent}
          ></textarea>
        </div>
        <button>Create note</button>
      </form>
      <section className="preview">
        <p>Note Preview:</p>
        <div className="note-card">
          <h3>{props.noteTitle}</h3>
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={props.previewNote}
          ></div>
        </div>
      </section>
    </section>
  );
}
