import { useEffect, useMemo } from 'react';
import { AppLayout } from './AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from './utils/debounce.js';
import {
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from './store/services/todosApi.js';
import {
  changeInputValue,
  clearInput,
  setTodos,
  startEditing,
  updateTodoTask,
  clearSearch,
  searchTask,
} from './store/todoSlice.js';

export const AppContainer = () => {
  const dispatch = useDispatch();
  const { inputValue, todos, idTask, isSearch } = useSelector(
    (state) => state.todos
  );

  const { data = [], isLoading, isError } = useGetTodosQuery();
  const [addTodo] = useAddNewTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

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

  const handleDeleteTodo = async (id) => {
    try {
      const result = await deleteTodo(id).unwrap();
      console.log('Задача успешно удалена!', result);
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleGetTodo = (item) => {
    console.log('Задача успешно получена и готова к редактированию!', item);
    dispatch(startEditing(item));
  };

  const handleUpdateTodo = async () => {
    try {
      if (inputValue.trim().length) {
        const result = await updateTodo({
          id: idTask,
          title: inputValue.trim(),
        }).unwrap();

        console.log('Задача успешно обновлена!', result);
        dispatch(clearInput());
        dispatch(updateTodoTask(result));
        dispatch(clearSearch());
      }
    } catch (error) {
      console.error('Ошибка при редактировании задачи:', error);
    }
  };

  return (
    <AppLayout
      handleAddTodo={handleAddTodo}
      handleDeleteTodo={handleDeleteTodo}
      handleInputChange={handleInputChange}
      handleGetTodo={handleGetTodo}
      handleUpdateTodo={handleUpdateTodo}
      isError={isError}
      todos={todos}
      isLoading={isLoading}
    />
  );
};
