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
    userProfile: UserProfileType,
  }
}
export type BookProfileType = {
  id: number,
  title: string,
  rating: number | null,
  issueYear: string,
  authors: string[],
  image: {
      url: string,
  }  | null,
}
export type UserProfileType = UserType & {
  role: {
    id: number,
    name: string,
    description: string,
    type: string,
  },
  comments: ProfileCommentType[],
  avatar: string,
  booking: ProfileBookingType,
  delivery: ProfileDeliveryType,
  history: ProfileHistoryType,
}
export type ProfileBookingType = {
    id: number,
    order: boolean,
    dateOrder: string,
    book: BookProfileType
}
export type ProfileDeliveryType = {
    id: number,
    handed: boolean,
    dateHandedFrom: string,
    dateHandedTo: string,
    book: BookProfileType
}
export type ProfileHistoryType = {
    id: number,
    books: BookProfileType[]
}
export type ProfileCommentType = {
    id: number,
    rating: number,
    text: string,
    bookId: number,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      JWTtoken: localStorage.getItem('JWTtoken') ? localStorage.JWTtoken : null,
      User: localStorage.getItem('user') ? JSON.parse(localStorage.user) : null,
      userProfile: null,
      },
    reducers: {
      setJWTtoken(state, action) {
          return {...state, JWTtoken: action.payload };
      },
      setUser(state, action) {
          return { ...state, User: action.payload }
      },
      setUserProfile(state, action) {
          return {...state, userProfile: action.payload}
      }
    }
});

export const {
  setJWTtoken,
  setUser,
  setUserProfile,
} = userSlice.actions;