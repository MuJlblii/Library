import { createSlice } from '@reduxjs/toolkit'

import { IBooksState, ICategories, IToaster } from '../interface/interface';

export interface IstateRedux {
  main: {
    currentCategory: string,
    categories: ICategories[],
    data: IBooksState[],
    sorting: boolean,
    searching: string,
    bookShelfView: string,
    isDesktopView: boolean,
    isMobileView: boolean,
    toasterMsg: IToaster | null,
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