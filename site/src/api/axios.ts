import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
// const LOCAL_URL = 'https://localhost:7004/api/'
/*const host =
  process.env.NODE_ENV === "development"
    ? (process.env.REACT_APP_LOCAL_API_HOST || "localhost:5000")
    : window.location.host;*/

    const host = "localhost:5000";

axios.defaults.baseURL = `http://${host}`;

// axios.interceptors.request.use((request:any) => {
//
// });

export default axios;
