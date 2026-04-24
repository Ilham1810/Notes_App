import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import NotesPage from "./pages/NotesPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#111827",
            color: "#fff",
            fontSize: "18px",
            padding: "16px 24px",
            fontWeight: "600",
            textAlign: "center",
            minWidth: "300px",
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* LOGIN */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/notes" />
              ) : (
                <LoginPage setToken={setToken} />
              )
            }
          />

          {/* REGISTER */}
          <Route path="/register" element={<RegisterPage />} />

          {/* NOTES (PROTECTED) */}
          <Route
            path="/notes"
            element={
              token ? (
                <NotesPage token={token} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;