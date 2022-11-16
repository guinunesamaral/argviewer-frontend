import axios from "axios";
import {
    ARGVIEWER_API,
    SENTENCE_ANALYZER_LOCALHOST_API_,
} from "../shared/constants";

export const argviewer = axios.create({
    baseURL: ARGVIEWER_API,
    timeout: 30000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export const sentenceAnalyzer = axios.create({
    baseURL: SENTENCE_ANALYZER_LOCALHOST_API_,
    timeout: 50000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
