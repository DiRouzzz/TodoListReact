import { useRef, useState } from 'react';

export const useRequestUpdateTodos = (setInputValue, setTodos, setIsSearch) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [idTask, setIdTask] = useState('');
  const inputRef = useRef(null);

  const requestEditTask = async (id) => {
    setIsUpdate(true);
    setIsSearch(false);
    inputRef.current.focus();
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка при запросе задачи');
      }
      const result = await response.json();
      setIdTask(result.id);
      setInputValue(result.title);
    } catch (error) {
      console.error(error);
    }
  };

  const requestUpdateTask = async (inputValue, id) => {
    if (!inputValue) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          title: inputValue.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error('Ошибка при обновлении задачи');
      }
      const updatedTask = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTask : todo))
      );
      console.log('Задача успешно изменена! на', updatedTask.title);
      setIsUpdate(false);
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  return { requestEditTask, requestUpdateTask, inputRef, isUpdate, idTask };
};
