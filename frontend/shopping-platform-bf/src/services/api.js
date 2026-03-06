import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user);
    if (parsedUser.token) {
      req.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }

  return req;
});

export default API;