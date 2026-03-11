import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
export const IMAGE_URL = API_URL;

const API = axios.create({
  baseURL: `${API_URL}/api`,
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;