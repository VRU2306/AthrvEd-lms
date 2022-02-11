import axios from "axios";

let axiosMod = axios.create({
  baseURL: "https://athrvedtesting2.herokuapp.com/"
});

export default axiosMod;
