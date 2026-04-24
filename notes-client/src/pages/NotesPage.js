import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

function NotesPage({ token }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");

  const [theme, setTheme] = useState("light");

  // 🌙 INIT THEME (AUTO DETECT + LOCAL STORAGE)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = systemDark ? "dark" : "light";

      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", systemDark);
    }
  }, []);

  // 🔁 TOGGLE THEME
  const toggleDark = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch {
      toast.error("Gagal ambil notes ❌");
    }
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const createNote = async () => {
    if (!title || !content) return toast.error("Isi dulu 😅");

    try {
      await api.post("/notes", { title, content });
      toast.success("Note ditambah 🎉");

      setTitle("");
      setContent("");
      fetchNotes();
    } catch {
      toast.error("Gagal tambah ❌");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Yakin hapus?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note dihapus 🗑️");
      fetchNotes();
    } catch {
      toast.error("Gagal hapus ❌");
    }
  };

  const openEdit = (note) => {
    setEditingNote(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const updateNote = async () => {
    try {
      await api.put(`/notes/${editingNote}`, {
        title: editTitle,
        content: editContent,
      });

      toast.success("Note diupdate ✨");
      setEditingNote(null);
      fetchNotes();
    } catch {
      toast.error("Gagal update ❌");
    }
  };

  // 🔍 SEARCH FILTER
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">📝 Notes</h1>

          <div className="flex gap-2">
            {/* 🌙 DARK MODE BUTTON */}
            <button
              onClick={toggleDark}
              className="bg-gray-800 text-white px-3 py-2 rounded flex items-center gap-2"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔍 SEARCH */}
        <input
          className="w-full p-3 mb-4 border rounded dark:bg-gray-800 dark:text-white"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CREATE */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
          <input
            className="w-full p-3 border mb-3 rounded dark:bg-gray-700 dark:text-white"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 border mb-3 rounded dark:bg-gray-700 dark:text-white"
            placeholder="Content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={createNote}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Note
          </button>
        </div>

        {/* NOTES */}
        {filteredNotes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada hasil 😢
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
              >
                {editingNote === note.id ? (
                  <>
                    <input
                      className="w-full p-2 border mb-2 dark:bg-gray-700 dark:text-white"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <textarea
                      className="w-full p-2 border mb-2 dark:bg-gray-700 dark:text-white"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />

                    <button
                      onClick={updateNote}
                      className="bg-green-500 text-white px-3 py-1 mr-2"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingNote(null)}
                      className="bg-gray-400 text-white px-3 py-1"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="font-bold text-lg dark:text-white">
                      {note.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {note.content}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => openEdit(note)}
                        className="bg-yellow-400 px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteNote(note.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;