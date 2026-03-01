import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API = "http://localhost:5000/api/notes";

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get(API);
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create Note
  const createNote = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    try {
      const res = await axios.post(API, {
        title,
        content,
        isPinned: false,
      });

      setNotes([...notes, res.data]); // instantly update UI
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note");
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Toggle Pin (Using PUT - safer)
  const togglePin = async (note) => {
    try {
      const res = await axios.put(`${API}/${note._id}`, {
        ...note,
        isPinned: !note.isPinned,
      });

      setNotes(
        notes.map((n) => (n._id === note._id ? res.data : n))
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
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
                <button onClick={() => togglePin(note)}>
                  {note.isPinned ? "Unpin" : "Pin"}
                </button>
                <button onClick={() => deleteNote(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
