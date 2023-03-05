import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      JWTtoken: localStorage.getItem('JWTtoken') ? localStorage.getItem('JWTtoken') : null,
      },
    reducers: {
      setJWTtoken(state, action) {
          return {...state, JWTtoken: action.payload };
      },
    }
})