import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:8000"
});

const token = Cookies.get("auth_token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}