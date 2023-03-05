import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { IBook, IBookPage, IBooksState, ICategories } from '../interface/interface';

import { store } from './store';

export const libraryApi = createApi({
  reducerPath: 'fetch',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://strapi.cleverland.by',
    prepareHeaders: (headers, {getState}) => {
      const { user } = (getState() as ReturnType<typeof store.getState>);

      if (user.JWTtoken) {
        headers.set('authorization', `Bearer ${user.JWTtoken}`);
        // sessionStorage.setItem()
      }
    }
  }),
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
    authorization: builder.mutation({
      query(body) {
        return {
          url: '/api/auth/local',
          method: 'POST',
          body,
        }
      }
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: '/api/auth/local/register',
          method: 'POST',
          body,
        }
      }
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: '/api/auth/forgot-password',
          method: 'POST',
          body,
        }
      }
    }),
    restorePassword: builder.mutation({
      query(body) {
        return {
          url: '/api/auth/reset-password',
          method: 'POST',
          body,
        }
      }
    })
  }),
});

export const {
  useGetBookByIdQuery,
  useGetCategoriesQuery,
  useGetBooksQuery,
  useGetAllBooksQuery,
  useAuthorizationMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useRestorePasswordMutation,
} = libraryApi;
