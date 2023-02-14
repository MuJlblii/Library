import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { IBook, IBookPage, IBooksState, ICategories } from '../interface/interface';

export const libraryApi = createApi({
  reducerPath: 'fetch',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://strapi.cleverland.by' }),
  tagTypes: [],
  endpoints: (builder) => ({
    getBookById: builder.query<IBookPage, string>({
      query: (id) => `/api/books/${id}`,
    }),
    getCategories: builder.query({
      query: () => '/api/categories',
    }),
    getAllBooks: builder.query({
      query: () => '/api/books',
    }),
    getBooks: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const categoriesResp = await fetchWithBQ('/api/categories');

        if (categoriesResp.error) {
          return { error: categoriesResp.error as FetchBaseQueryError };
        }
        const categories = categoriesResp.data as ICategories[];
        const categorArray: IBooksState[] = categories.map((el) => ({ ...el, list: null }));
        const booksResp = await fetchWithBQ('/api/books');

        if (booksResp.data) {
          for (let i = 0; i < categorArray.length; i++) {
            for (let j = 0; j < (booksResp.data as IBook[]).length; j++) {
              if ((booksResp.data as IBook[])[j].categories.includes(categorArray[i].name)) {
                if (categorArray[i].list == null) {
                  categorArray[i].list = [(booksResp.data as IBook[])[j]];
                } else categorArray[i].list = [...(categorArray[i].list as IBook[]), (booksResp.data as IBook[])[j]];
              }
            }
          }

          return { data: categorArray };
        }

        return { error: booksResp.error as FetchBaseQueryError };
      },
    }),
  }),
});

export const { useGetBookByIdQuery, useGetCategoriesQuery, useGetBooksQuery, useGetAllBooksQuery } = libraryApi;
