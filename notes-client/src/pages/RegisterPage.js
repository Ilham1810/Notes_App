import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/register", { name, email, password });

      toast.success("Register berhasil 🎉");

      navigate("/");
    } catch (err) {
      console.log(err.response);
      toast.error("Register gagal ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-600">
      <div className="bg-white p-6 rounded w-80">

        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input
          className="w-full p-2 border mb-2"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 border mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-500 text-white py-2"
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default RegisterPage;