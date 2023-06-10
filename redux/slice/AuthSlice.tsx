"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Auth } from "../../types/Auth.types";

type AuthState = {
  auth: Auth | null;
};

const initialState: AuthState = {
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Auth>) => {
      // const {firstName, lastName, img, id}= action.payload
      state.auth = action.payload
    },
    logout: (state, action: PayloadAction<Auth>) => {
      state.auth = null;
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentFirstName = (state: { auth: AuthState }) =>
  state.auth.auth?.firstName;

export const selectCurrentLastName = (state: { auth: AuthState }) =>
  state.auth.auth?.lastName;

export const selectCurrentImg = (state: { auth: AuthState }) =>
  state.auth.auth?.img;
