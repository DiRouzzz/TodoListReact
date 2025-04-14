import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { debounce } from '../../utils/debounce.js';
import { TaskContainer } from '../Task/TaskContainer.jsx';
import { AppLayout } from './AppLayout.jsx';
import { TaskNotExist, NotFound } from '../NotFound/index.js';
import {
  useAddNewTodoMutation,
  useGetTodosQuery,
} from '../../store/services/todosApi.js';
import {
  changeInputValue,
  clearInput,
  setTodos,
  searchTask,
  searchMode,
  sortTodos,
} from '../../store/todoSlice.js';

export const AppContainer = () => {
  const dispatch = useDispatch();

  const { inputValue, todos, isSearch, searchResults } = useSelector(
    (state) => state.todos
  );

  const { data = [], isLoading } = useGetTodosQuery();
  const [addTodo] = useAddNewTodoMutation();

  useEffect(() => {
    if (data.length) {
      dispatch(setTodos(data));
    }
  }, [data, dispatch]);

  const debouncedSearch = useMemo(() => {
    return debounce((value) => {
      dispatch(searchTask(value));
    }, 300);
  }, [dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(changeInputValue(value));

    if (isSearch) {
      debouncedSearch(value);
    }
  };

  const handleAddTodo = async () => {
    try {
      if (inputValue.trim().length) {
        const result = await addTodo({ title: inputValue.trim() }).unwrap();
        console.log('Задача успешно добавлена!', result);

        dispatch(clearInput());
      }
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            handleAddTodo={handleAddTodo}
            handleInputChange={handleInputChange}
            todos={todos}
            isLoading={isLoading}
            isSearch={isSearch}
            inputValue={inputValue}
            searchMode={searchMode}
            dispatch={dispatch}
            searchResults={searchResults}
            sortTodos={sortTodos}
          />
        }
      />
      <Route path="/task/:id" element={<TaskContainer />} />
      <Route path="/task-not-exist" element={<TaskNotExist />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
