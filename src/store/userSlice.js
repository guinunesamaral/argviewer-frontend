import { createSlice } from "@reduxjs/toolkit";
import { argviewer } from "../plugins/axios";

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
        cadastro: (state, action) => {
            state = action.payload;
        },
        update: (state, action) => {
            state = action.payload;
        },
    },
});

export const { login } = userSlice.actions;

export const fetchUserByNickname = (nickname) => async (dispatch) => {
    const resFindByNickname = await argviewer.get(`usuarios?value=${nickname}`);
    if (resFindByNickname.status === 200) {
        dispatch(login(resFindByNickname.data[0]));
    }
};

export default userSlice.reducer;
