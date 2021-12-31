import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const test= JSON.parse(localStorage.getItem('persist:root'))
const TOKEN = test ? JSON.parse(test.user).currentUser.accessToken : "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});