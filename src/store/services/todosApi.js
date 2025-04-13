import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TODO_API } from '../../api';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: TODO_API,
  }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => 'tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks', id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addNewTodo: build.mutation({
      query: (body) => ({
        url: 'tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTodo: build.mutation({
      query: ({ id, title }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body: { title },
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;
