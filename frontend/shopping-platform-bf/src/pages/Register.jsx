import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useEffect } from "react";

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

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;