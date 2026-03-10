import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
  token?: string;
};

const initialState: SliceState = {
  // Set the default backend address to the host computer when running a web dev build
  // Constants.expoConfig.hostUri is null when using expo web
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
