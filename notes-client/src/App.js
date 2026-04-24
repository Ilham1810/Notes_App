import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import RegisterPage from "./pages/RegisterPage";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // HANDLE TOKEN DARI GOOGLE 
  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const newToken = params.get("token");

  //   if (newToken) {
  //     localStorage.setItem("token", newToken);
  //     setToken(newToken);
  //     window.location.href = "/notes";
  //   }
  // }, []);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "18px",
            fontSize: "18px",
            padding: "18px 26px",
            minWidth: "320px",
            fontWeight: "600",
            textAlign: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          },
          success: {
            style: {
              background: "#16a34a",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc2626",
              color: "#fff",
            },
          },
        }}
      />

      {/* ROUTER */}
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

          {/* NOTES */}
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