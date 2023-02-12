import { createSlice } from '@reduxjs/toolkit'

import dataJSON from '../assets/mock-data/books.json';

export interface IBookType {
    id: string,
    image: string | string[],
    category: string,
    author: string,
    title: string,
    rating: number,
    year: number,
    isBooked: boolean,
    bookedTill: string
}
type BooksType = {
    [key: string]: IBookType[]
}
export interface IstateRedux {
  main: {
    currentCategory: string,
    data: BooksType,
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
    data: Object.assign(dataJSON),
    sorting: false,
    searching: '',
    bookShelfView: 'Table',
    isDesktopView: true,
    isMobileView: false,
    },
  reducers: {
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