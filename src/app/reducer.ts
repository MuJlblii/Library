import { createSlice } from '@reduxjs/toolkit'

import { BooksStateType, CategoriesType, ToasterType } from '../types/types';

export type StateReduxType = {
  main: {
    currentCategory: string,
    categories: CategoriesType[],
    data: BooksStateType[],
    sorting: boolean,
    searching: string,
    bookShelfView: string,
    isDesktopView: boolean,
    isMobileView: boolean,
    toasterMsg: ToasterType | null,
  }
}

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    currentCategory: 'all',
    categories: [],
    data: [],
    sorting: false,
    searching: '',
    bookShelfView: 'Table',
    isDesktopView: true,
    isMobileView: false,
    toasterMsg: null,
    },
  reducers: {
    setDataFetch(state, action) {
        return {...state, data: action.payload };
    },
    setCategories(state, action) {
      return {...state, categories: action.payload };
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
    setToasterMsg(state, action) {
      return {...state, toasterMsg: action.payload}
    }
}
})

export const {
  setDataFetch,
  currentCategorySet,
  sorting,
  searching,
  setBookShelfView,
  setDesktopView,
  setMobileView,
  setToasterMsg,
  setCategories,
} = mainSlice.actions;