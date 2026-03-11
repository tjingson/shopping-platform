import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";


function Login() {

  //check login state
  useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    navigate("/");
  }
  }, []);

  const [form, setForm] = useState(
    { email: "", password: "" }
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);

      //locally save login state
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful!");
      navigate("/");

    } catch (error) {
      toast.error("Invalid email or password");
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
  <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-2xl shadow-lg w-96"
  >
    <h2 className="text-2xl font-bold mb-6 text-center">
      Login
    </h2>

    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={form.password}
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <button
      type="submit"
      className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
    >
      Login
    </button>
  </form>
</div>
  );
}

export default Login;