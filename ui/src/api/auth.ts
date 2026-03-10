import { api } from "./index";

interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterParams {
  email: string;
  password: string;
}

const server = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginParams>({
      query: (arg) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: arg,
      }),
    }),
    register: builder.mutation<LoginResponse, RegisterParams>({
      query: (arg) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: arg,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = server;
