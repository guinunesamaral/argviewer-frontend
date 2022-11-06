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

const userAdapter = createEntityAdapter();

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (_, action) => {
            return {
                data: {
                    id: action.payload.id,
                    nome: action.payload.nome,
                    nickname: action.payload.name,
                    email: action.payload.email,
                    senha: action.payload.senha,
                    foto: action.payload.foto,
                },
                isLoggedIn: true,
            };
        },
        cadastro: (_, action) => {
            return {
                data: {
                    id: action.payload.id,
                    nome: action.payload.nome,
                    nickname: action.payload.name,
                    email: action.payload.email,
                    senha: action.payload.senha,
                    foto: action.payload.foto,
                },
                isLoggedIn: true,
            };
        },
        update: (_, action) => {
            return {
                data: {
                    id: action.payload.id,
                    nome: action.payload.nome,
                    nickname: action.payload.name,
                    email: action.payload.email,
                    senha: action.payload.senha,
                    foto: action.payload.foto,
                },
                isLoggedIn: true,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            userAdapter.removeAll(state);
        });
    },
});

export const { login, logout, cadastro, update } = userSlice.actions;

export default userSlice.reducer;
