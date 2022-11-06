import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = [];

const proposicaoAdapter = createEntityAdapter();

export const proposicaoSlice = createSlice({
    name: "proposicao",
    initialState,
    reducers: {
        addAll: (_, action) => {
            return [action.payload];
        },
        addOne: (state, action) => {
            return [...state, action.payload];
        },
        update: (state, action) => {
            return;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            proposicaoAdapter.removeAll(state);
        });
    },
});

export const { addAll, addOne, update } = proposicaoSlice.actions;

export default proposicaoSlice.reducer;
