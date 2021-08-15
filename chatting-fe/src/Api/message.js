import axiosClient from ".";

export const messageApi = {
    getMessagesByConversationId(conversationId) {
        const url = "/api/messages/" + conversationId;
        return axiosClient.get(url);
    },
    sendMessage(body) {
        const url = "/api/messages";
        return axiosClient.post(url, body);
    }
};