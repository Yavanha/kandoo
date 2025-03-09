import axios from "axios";

export default {
  instance: axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-type": "application/json",
    },
  }),
};
