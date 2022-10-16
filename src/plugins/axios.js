import axios from "axios";

const ARGVIEWER_HEROKU = "https://argviewer-api.herokuapp.com/api/";

export const axiosInstance = axios.create({
    baseURL: ARGVIEWER_HEROKU,
    timeout: 10000,
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
