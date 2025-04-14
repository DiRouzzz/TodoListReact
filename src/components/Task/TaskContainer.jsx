import { TaskLayout } from './TaskLayout';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useDeleteTodoMutation,
  useGetTodoItemQuery,
  useUpdateTodoMutation,
} from '../../store/services/todosApi';
import {
  clearInput,
  endEdtiting,
  clearSearch,
  startEditing,
  removeFromSearch,
  changeInputValue,
} from '../../store/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { todosApi } from '../../store/services/todosApi';
import { useEffect } from 'react';

export const TaskContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUpdate, inputValue, idTask } = useSelector((state) => state.todos);
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const {
    data: todoItem,
    isLoading: isLoadingTodo,
    refetch: refetchTodoItem,
    isError,
  } = useGetTodoItemQuery(params.id);

  useEffect(() => {
    if (!isLoadingTodo && isError) {
      navigate('/task-not-exist');
    }
  }, [isLoadingTodo, isError, navigate]);

  const handleDeleteTodo = async (id) => {
    try {
      const result = await deleteTodo(id).unwrap();
      console.log('Задача успешно удалена!', result);
      dispatch(removeFromSearch(id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleUpdateTodo = async (shouldRefetch = true) => {
    try {
      if (inputValue.trim().length) {
        const result = await updateTodo({
          id: idTask,
          title: inputValue.trim(),
        }).unwrap();

        console.log('Задача успешно обновлена!', result);
        dispatch(clearInput());
        dispatch(endEdtiting(result));
        dispatch(clearSearch());

        dispatch(
          todosApi.util.updateQueryData('getTodoItem', params.id, (draft) => {
            if (draft) {
              draft.title = result.title;
            }
          })
        );
        if (shouldRefetch) {
          await refetchTodoItem();
        }
      }
    } catch (error) {
      console.error('Ошибка при редактировании задачи:', error);
    }
  };

  const handleGetTodo = (item) => {
    console.log('Задача успешно получена и готова к редактированию!', item);
    dispatch(startEditing(item));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(changeInputValue(value));
  };

  return (
    <TaskLayout
      handleUpdateTodo={handleUpdateTodo}
      handleDeleteTodo={handleDeleteTodo}
      isUpdate={isUpdate}
      navigate={navigate}
      params={params}
      inputValue={inputValue}
      todoItem={todoItem}
      isLoadingTodo={isLoadingTodo}
      handleGetTodo={handleGetTodo}
      handleInputChange={handleInputChange}
    />
  );
};
