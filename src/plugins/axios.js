import axios from "axios";
import {
    ARGVIEWER_LOCALHOST_API,
    SENTENCE_ANALYZER_API,
} from "../shared/constants";

export const argviewer = axios.create({
    baseURL: ARGVIEWER_LOCALHOST_API,
    timeout: 100000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

export const sentenceAnalyzer = axios.create({
    baseURL: SENTENCE_ANALYZER_API,
    timeout: 100000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});
