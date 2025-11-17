import axios from "axios";

const API = axios.create({
  baseURL: "https://lumarisehotel.com/api/",
});

export default API;
