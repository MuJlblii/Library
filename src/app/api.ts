import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { PATHS } from '../constants/path-routing';

import { BookType, BookPageType, BooksStateType, CategoriesType, CommentsType } from '../types/types';

import { store } from './store';

type CommentTypePost = {
  bookId: number,
  toSend: {data: {rating: number, text: string, user: number, book: number}},
  backupComment: CommentsType,
}

export const libraryApi = createApi({
  reducerPath: 'fetch',
  baseQuery: fetchBaseQuery({
    baseUrl: PATHS.baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const { user } = (getState() as ReturnType<typeof store.getState>);

      if (user.JWTtoken) {
        headers.set('authorization', `Bearer ${user.JWTtoken}`);
      }
    }
  }),
  tagTypes: ['User', 'Books', 'Book'],
  endpoints: (builder) => ({
    getBookById: builder.query<BookPageType, string>({
      query: (id) => `/api/books/${id}`,
      providesTags: ['Book']
    }),
    getCategories: builder.query({
      query: () => '/api/categories',
    }),
    getAllBooks: builder.query({
      query: () => '/api/books',
      providesTags: ['Books']
    }),
    getBooks: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const categoriesResp = await fetchWithBQ('/api/categories');

        if (categoriesResp.error) {
          return { error: categoriesResp.error as FetchBaseQueryError };
        }
        const categories = categoriesResp.data as CategoriesType[];
        const categorArray: BooksStateType[] = categories.map((el) => ({ ...el, list: null }));
        const booksResp = await fetchWithBQ('/api/books');

        if (booksResp.data) {
          for (let i = 0; i < categorArray.length; i++) {
            for (let j = 0; j < (booksResp.data as BookType[]).length; j++) {
              if ((booksResp.data as BookType[])[j].categories.includes(categorArray[i].name)) {
                if (categorArray[i].list == null) {
                  categorArray[i].list = [(booksResp.data as BookType[])[j]];
                } else categorArray[i].list = [...(categorArray[i].list as BookType[]), (booksResp.data as BookType[])[j]];
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
    }),
    booking: builder.mutation({
      query(body) {
        return {
          url: '/api/bookings',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: ['Book', 'Books', 'User']
    }),
    changeBooking: builder.mutation({
      query({id, ...put}) {
        return {
          url: `/api/bookings/${id}`,
          method: 'PUT',
          body: put,
        }
      },
      invalidatesTags: ['Book', 'Books', 'User']
    }),
    deleteBooking: builder.mutation({
      query({id, ...put}) {
        return {
          url: `/api/bookings/${id}`,
          method: 'DELETE',
          body: put,
        }
      },
      invalidatesTags: ['Book', 'Books', 'User']
    }),
    addComment: builder.mutation<void, Pick<CommentTypePost, 'bookId'> & Partial<CommentTypePost>>({
      query({toSend}) {
        return {
          url: '/api/comments',
          method: 'POST',
          body: toSend,
        }
      },
      invalidatesTags: ['Book', 'Books', 'User'],
      async onQueryStarted({backupComment, bookId}, {dispatch, queryFulfilled}) {
        if (bookId) {
          const backupResult = dispatch(libraryApi.util.updateQueryData('getBookById', bookId.toString(), (draft) => {
            if (backupComment && draft?.comments !== null) {
              return {...draft, comments: [...draft.comments, backupComment]};
            }

            return {...draft, comments: null};
          })
          );

          try {
            await queryFulfilled
          } catch {
            backupResult.undo();
          }
        }
      },
    }),
    updateComment: builder.mutation({
      query({id, ...body}) {
        return {
          url: `/api/comments/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Book', 'Books', 'User']
    }),
    getProfileUser: builder.query({
      query: () => '/api/users/me',
      providesTags: ['User']
    }),
    imageUpload: builder.mutation({
      query(body) {
        return {
          url: '/api/upload',
          method: 'POST',
          body,
        }
      },
    }),
    changeProfileInfo: builder.mutation({
      query({userId, ...put}) {
        return {
          url: `/api/users/${userId}`,
          method: 'PUT',
          body: put,
        }
      },
      invalidatesTags: ['User']
    }),
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
  useBookingMutation,
  useChangeBookingMutation,
  useDeleteBookingMutation,
  useAddCommentMutation,
  useGetProfileUserQuery,
  useImageUploadMutation,
  useChangeProfileInfoMutation,
  useUpdateCommentMutation,
} = libraryApi;
