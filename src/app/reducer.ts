import { createSlice } from '@reduxjs/toolkit'

import { IBooksState } from '../interface/interface';

export interface IstateRedux {
  main: {
    currentCategory: string,
    data: IBooksState[],
    sorting: boolean,
    searching: string,
    bookShelfView: string,
    isDesktopView: boolean,
    isMobileView: boolean,
  }
}

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    currentCategory: 'all',
    data: [],
    sorting: false,
    searching: '',
    bookShelfView: 'Table',
    isDesktopView: true,
    isMobileView: false,
    },
  reducers: {
    setDataFetch(state, action) {
        return {...state, data: action.payload };
    },
    currentCategorySet(state, action) {
        return {...state, currentCategory: action.payload };
    },
    sorting(state, action) {
        return {...state, sorting: action.payload };
    },
    searching(state, action) {
        return {...state, searching: action.payload };
    },
    setBookShelfView(state, action) {
        return {...state, bookShelfView: action.payload };
    },
    setDesktopView(state, action) {
        return {...state, isDesktopView: action.payload}
    },
    setMobileView(state, action) {
      return {...state, isMobileView: action.payload}
  },
}
})

export const {
  setDataFetch,
  currentCategorySet,
  sorting,
  searching,
  setBookShelfView,
  setDesktopView,
  setMobileView
} = mainSlice.actions;