import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    inputValue: '',
    isUpdate: false,
    idTask: null,
    searchResults: [],
    isSearch: false,
  },
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    changeInputValue(state, action) {
      state.inputValue = action.payload;
    },
    clearInput(state) {
      state.inputValue = '';
    },
    startEditing(state, action) {
      state.isUpdate = true;
      state.idTask = action.payload.id;
      state.inputValue = action.payload.title;
    },
    endEdtiting(state) {
      state.isUpdate = false;
      state.idTask = null;
    },
    sortTodos(state) {
      let todos;
      state.isSearch ? (todos = state.searchResults) : (todos = state.todos);
      todos.sort((a, b) => a.title.localeCompare(b.title));
    },
    searchTask(state, action) {
      const searchText = action.payload.toLowerCase();
      state.searchResults = state.todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchText)
      );
    },
    searchMode(state) {
      state.isSearch = true;
      state.inputValue = '';
      state.searchResults = [];
    },
    clearSearch(state) {
      state.isSearch = false;
      state.searchResults = [];
      state.inputValue = '';
    },
    removeFromSearch(state, action) {
      const idToRemove = action.payload;
      state.searchResults = state.searchResults.filter(
        (todo) => todo.id !== idToRemove
      );
    },
  },
});

export const {
  changeInputValue,
  clearInput,
  startEditing,
  endEdtiting,
  sortTodos,
  searchTask,
  clearSearch,
  searchMode,
  setTodos,
  getTodoItem,
  removeFromSearch,
} = todoSlice.actions;

export default todoSlice.reducer;
