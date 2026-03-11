import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Register() {

  //check login state
  useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    navigate("/");
  }
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Register successful!");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;