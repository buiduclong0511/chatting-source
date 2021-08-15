import axios from "axios";
const queryString = require("query-string");

export * from "./user";
export * from "./conversation";
export * from "./message";

const axiosClient = axios.create({
    baseURL: "https://chatting-be.herokuapp.com",

    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },

    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response;
        }
        return response;
    },

    (error) => {
        throw error;
    }
);

export default axiosClient;