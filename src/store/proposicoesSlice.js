import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    data: [],
};

const proposicoesAdapter = createEntityAdapter();

export const proposicoesSlice = createSlice({
    name: "proposicoes",
    initialState,
    reducers: {
        addAll: (_, action) => {
            return { data: [...action.payload] };
        },
        addOne: (state, action) => {
            return { data: [...state, action.payload] };
        },
        addRespostas: (state, action) => {
            return {
                data: state.data.map((item, index) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            respostas: action.payload.respostas,
                        };
                    }
                    return item;
                }),
            };
        },
        update: (state, action) => {
            return [...state];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            proposicoesAdapter.removeAll(state);
        });
    },
});

export const { addAll, addOne, addRespostas, update } =
    proposicoesSlice.actions;

export default proposicoesSlice.reducer;
