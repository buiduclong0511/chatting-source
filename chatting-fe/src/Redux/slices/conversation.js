const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    conversations: []
}

const conversation = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversations(state, action) {
            state.conversations = action.payload;
        }
    }
});

export const conversationSelector = state => state.conversation;

export const {
    setConversations
} = conversation.actions;

export default conversation.reducer;