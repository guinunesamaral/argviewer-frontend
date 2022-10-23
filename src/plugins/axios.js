import axios from "axios";

const ARGVIEWER_HEROKU = "https://argviewer-api.herokuapp.com/api/";
const SENTENCE_ANALYZER_HEROKU =
    "https://argviewer-sentence-analyzer.herokuapp.com/api/";

export const argviewer = axios.create({
    baseURL: ARGVIEWER_HEROKU,
    timeout: 10000,
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export const sentenceAnalyzer = axios.create({
    baseURL: SENTENCE_ANALYZER_HEROKU,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
