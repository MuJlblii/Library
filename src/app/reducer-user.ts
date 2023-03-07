import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      JWTtoken: localStorage.getItem('JWTtoken') ? localStorage.JWTtoken : null,
      },
    reducers: {
      setJWTtoken(state, action) {
          return {...state, JWTtoken: action.payload };
      },
    }
});

export const {
  setJWTtoken
} = userSlice.actions;