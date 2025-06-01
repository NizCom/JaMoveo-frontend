import axios from "axios";

const api = axios.create({
  baseURL: VITE_BASE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
