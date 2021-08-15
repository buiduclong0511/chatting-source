
import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth";
import conversationReducer from "./conversation";

export * from "./auth";

const rootReducer = combineReducers({
    auth: authReducer,
    conversation: conversationReducer
});

export default rootReducer;