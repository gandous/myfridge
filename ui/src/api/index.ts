import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { type RootState } from "@/store";

const BASE_URL = __DEV__ ? "http://localhost:5000" : "";

interface ApiErrorBody {
  err_code: string;
  description: string;
}

export interface ApiError {
  status: string;
  error: string;
  data: ApiErrorBody;
}

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, ApiError> = (
  args,
  webApi,
  extraOptions,
) => {
  const state = webApi.getState() as RootState;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      if (state.auth.token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${state.auth.token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, ApiError>;
  return rawBaseQuery(args, webApi, extraOptions);
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
