import { createSlice } from '@reduxjs/toolkit';

export type UserType = {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  createdAt: string,
  updatedAt: string,
  firstName: string,
  lastName: string,
  phone: string,
}
export type UserStateType = {
  user: {
    JWTtoken: string,
    User: UserType | null,
  }
}
export const userSlice = createSlice({
    name: 'user',
    initialState: {
      JWTtoken: localStorage.getItem('JWTtoken') ? localStorage.JWTtoken : null,
      User: null
      },
    reducers: {
      setJWTtoken(state, action) {
          return {...state, JWTtoken: action.payload };
      },
      setUser(state, action) {
          return { ...state, User: action.payload }
      }
    }
});

export const {
  setJWTtoken,
  setUser
} = userSlice.actions;