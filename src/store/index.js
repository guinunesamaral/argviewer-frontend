import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import usuarioReducer from "./usuarioSlice";
import proposicoesReducer from "./proposicoesSlice";
import { usuarioApi } from "./usuarioApi";

const persistConfig = {
    key: "root",
    storage,
};
const persistedUsuarioReducer = persistReducer(persistConfig, usuarioReducer);
// const persistedUsuarioReducer = persistReducer(
//     persistConfig,
//     usuarioApi.reducer
// );

export const store = configureStore({
    reducer: {
        usuario: persistedUsuarioReducer,
        proposicoes: proposicoesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(usuarioApi.middleware),
});
export const persistor = persistStore(store);
