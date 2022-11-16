import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    data: {
        id: 0,
        nome: "",
        nickname: "",
        email: "",
        foto: "",
    },
    isLoggedIn: false,
};

const usuarioAdapter = createEntityAdapter();

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
        login: (_, action) => {
            return {
                data: {
                    ...action.payload,
                },
                isLoggedIn: true,
            };
        },
        logout: () => {
            return {
                data: {},
                isLoggedIn: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            usuarioAdapter.removeAll(state);
        });
    },
});

export const { login, logout } = usuarioSlice.actions;

export default usuarioSlice.reducer;
