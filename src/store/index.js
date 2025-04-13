import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { todosApi } from './services/todosApi';

export default configureStore({
  reducer: {
    todos: todoReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApi.middleware),
});
