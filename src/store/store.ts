import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import commentReducer from "./comment/commentSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        comment: commentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
