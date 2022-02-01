import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import axios from "axios";

axios.defaults.baseURL = "https://challenge.3fs.si/storage";

ReactDOM.render(<App />, document.getElementById("root"));
