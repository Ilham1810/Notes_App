import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // APPLY THEME
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // FETCH NOTES
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch {
      toast.error("Gagal ambil notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ➕ ADD NOTE
  const addNote = async () => {
    if (!title || !content) return toast.error("Isi dulu");

    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      toast.success("Note ditambahkan");
      fetchNotes();
    } catch {
      toast.error("Gagal tambah note");
    }
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    if (!window.confirm("Yakin hapus?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note dihapus");
      fetchNotes();
    } catch {
      toast.error("Gagal hapus");
    }
  };

  // SEARCH FILTER
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">📝 Notes</h1>

        <div className="flex gap-2">
          {/* THEME BUTTON */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className={`px-4 py-2 rounded font-semibold transition ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-yellow-400 text-black"
            }`}
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="🔍 Search notes..."
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CREATE NOTE */}
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm p-6 rounded-xl mb-6">
        <input
          placeholder="Title..."
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content..."
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="
              bg-white dark:bg-gray-800 
              border border-gray-300 dark:border-gray-600 
              shadow-sm p-5 rounded-xl 
              transition duration-200
              hover:shadow-md hover:-translate-y-1
            "
          >
            <h2 className="font-bold text-lg dark:text-white">
              {note.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {note.content}
            </p>

            <div className="mt-4 flex gap-2">
              <button className="bg-yellow-400 px-3 py-1 rounded">
                Edit
              </button>

              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredNotes.length === 0 && (
        <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
          Belum ada catatan
        </p>
      )}
    </div>
  );
}

export default NotesPage;