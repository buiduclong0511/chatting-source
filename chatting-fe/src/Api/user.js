import axiosClient from ".";

export const userApi = {
    login(body) {
        const url = "/api/auth/login";
        return axiosClient.post(url, body);
    },
    register(body) {
        const url = "/api/auth/register";
        return axiosClient.post(url, body);
    },
    search(q) {
        const url = "/api/users?q=" + q;
        return  axiosClient.get(url);
    }
};