import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('http://localhost:3000/tasks');

      if (!response.ok) {
        throw new Error('Ошибка запроса!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (inputValue, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении задачи.');
      }

      const data = await response.json();
      console.log('Задача успешно добавлена! ', data.title);
      dispatch(addTodo(data));
      dispatch(clearInput());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении задачи');
      }

      console.log('Задача успешно удалена!');

      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTodo = createAsyncThunk(
  'todos/editTask',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка при запросе задачи');
      }
      const data = await response.json();
      console.log('dataEditTask', data.id);

      dispatch(startEditing(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'todos/updateTask',
  async function ({ id, title }, { rejectWithValue, dispatch }) {
    if (!title.length) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении задачи');
      }
      const data = await response.json();
      dispatch(updateTodoTask(data));
      dispatch(clearInput());
      dispatch(clearSearch());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    inputValue: '',
    isLoading: false,
    isUpdate: false,
    error: null,
    idTask: null,
    searchResults: [],
    isSearch: false,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
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
    updateTodoTask(state, action) {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(editTodo.fulfilled, (state) => {
        state.isUpdate = true;
      })
      .addCase(fetchTodos.rejected, setError)
      .addCase(addNewTodo.rejected, setError)
      .addCase(deleteTodo.rejected, setError)
      .addCase(editTodo.rejected, setError)
      .addCase(updateTask.rejected, setError);
  },
});

export const {
  addTodo,
  editTaskTodo,
  removeTodo,
  changeInputValue,
  clearInput,
  startEditing,
  updateTodoTask,
  sortTodos,
  searchTask,
  clearSearch,
  searchMode,
} = todoSlice.actions;

export default todoSlice.reducer;
