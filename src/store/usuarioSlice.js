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
                    id: action.payload.id,
                    nome: action.payload.nome,
                    nickname: action.payload.nickname,
                    email: action.payload.email,
                    senha: action.payload.senha,
                    foto: action.payload.foto,
                    anonimo: action.payload.anonimo,
                },
                isLoggedIn: true,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            usuarioAdapter.removeAll(state);
        });
    },
});

export const { login } = usuarioSlice.actions;

export default usuarioSlice.reducer;
