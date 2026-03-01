import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API = "http://localhost:5000/api/notes";

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    if (!title || !content) return;
    await axios.post(API, { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  const togglePin = async (id) => {
    await axios.patch(`${API}/${id}/pin`);
    fetchNotes();
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <nav className="navbar">
        <h2>📝 Notes Pro</h2>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </nav>

      <div className="container">
        <div className="form">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={createNote}>Add Note</button>
        </div>

        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`note-card ${note.isPinned ? "pinned" : ""}`}
            >
              <div className="note-header">
                <h3>{note.title}</h3>
                {note.isPinned && <span>📌</span>}
              </div>
              <p>{note.content}</p>
              <div className="note-buttons">
                <button onClick={() => togglePin(note._id)}>Pin</button>
                <button onClick={() => deleteNote(note._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
