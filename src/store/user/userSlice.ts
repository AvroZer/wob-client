import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUser } from "../../types/types";

interface userState {
    user: IUser | null;
    isAuth: boolean;
    isAdmin: boolean;
}

const initialState: userState = {
    user: null,
    isAuth: false,
    isAdmin: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.user = null;
            state.isAuth = false;
            state.isAdmin = false;
        },
    },
});

export const { login, logout } = userSlice.actions;

export const selectCount = (state: RootState) => state.user;

export default userSlice.reducer;
