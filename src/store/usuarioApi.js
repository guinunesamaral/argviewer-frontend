import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ARGVIEWER_API } from "../shared/constants";

export const usuarioApi = createApi({
    reducerPath: "usuario",
    baseQuery: fetchBaseQuery({ baseUrl: ARGVIEWER_API }),
    endpoints: (builder) => ({
        login: builder.query({
            query: () => "usuarios/login",
        }),
        findByNickname: builder.query({
            query: (nickname) => `usuarios?nickname=${nickname}`,
        }),
    }),
});

export const { useLoginQuery, useFindByNicknameQuery } = usuarioApi;
