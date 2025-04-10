import { useEffect, useMemo } from 'react';
import { AppLayout } from './AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addNewTodo,
  changeInputValue,
  clearInput,
  updateTask,
  searchTask,
} from './store/todoSlice.js';
import { debounce } from './utils/debounce.js';

export const AppContainer = () => {
  const dispatch = useDispatch();
  const { inputValue, isSearch } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const debouncedSearch = useMemo(() => {
    return debounce((value) => {
      dispatch(searchTask(value));
    }, 300);
  }, [dispatch]);

  const handleActionAddTodo = () => {
    if (inputValue.trim().length) {
      dispatch(addNewTodo(inputValue));
      dispatch(clearInput());
    }
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(changeInputValue(value));

    if (isSearch) {
      debouncedSearch(value);
    }
  };

  const handleUpdateTask = ({ id, title }) => {
    if (inputValue.trim().length) {
      dispatch(updateTask({ id, title }));
    }
  };

  return (
    <AppLayout
      handleActionAddTodo={handleActionAddTodo}
      handleInputChange={handleInputChange}
      handleUpdateTask={handleUpdateTask}
      debouncedSearch={debouncedSearch}
    />
  );
};
