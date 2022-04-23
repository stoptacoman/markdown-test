import { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { directus } from "./services/directus";

import NoteForm from "./components/NoteForm";
import NoteListing from "./components/NoteListing";

const quicknotes = directus.items("quicknotes");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  smartypants: true,
});

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [mdContent, setMdContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    const { data } = await quicknotes.readByQuery({ limit: -1 });
    setNotes(data);
  }
  async function createNote(e) {
    e.preventDefault();
    if (mdContent && title) {
      await quicknotes.createOne({
        title: title,
        note: mdContent,
      });
      setMdContent("");
      setTitle("");
      getNotes();
    }
  }
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleNotePreview(e) {
    setMdContent(e.target.value);
  }

  function parseMarkdown(noteMarkdown) {
    let rawMarkup = marked(noteMarkdown);
    let cleanMarkup = DOMPurify.sanitize(rawMarkup);

    return { __html: cleanMarkup };
  }
  return (
    <main>
      <section className="note-listing">
        {notes.map((note) => (
          <NoteListing
            key={note.id}
            noteTitle={note.title}
            note={parseMarkdown(note.note)}
          />
        ))}
      </section>
      <NoteForm
        createNote={createNote}
        noteTitle={title}
        handleTitleChange={handleTitleChange}
        noteContent={mdContent}
        handleNotePreview={handleNotePreview}
        previewNote={parseMarkdown(mdContent)}
      />
    </main>
  );
}

export default App;
