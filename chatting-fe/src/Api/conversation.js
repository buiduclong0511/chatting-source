import axiosClient from ".";

export const conversationApi = {
    createNewConversation(body) {
        const url = "/api/conversations";
        return axiosClient.post(url, body);
    },
    getConversationsBySenderId(senderId) {
        const url = "/api/conversations/?senderId=" + senderId;
        return axiosClient.get(url);
    }
};