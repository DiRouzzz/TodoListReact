import { useRef, useState, useCallback } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../firebase.js';

export const useRequestUpdateTodos = (setInputValue, setIsSearch) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [idTask, setIdTask] = useState('');
  const inputRef = useRef(null);

  const requestEditTask = async (id, title) => {
    setIsUpdate(true);
    inputRef.current.focus();
    setIdTask(id);
    setInputValue(title);
  };

  const requestUpdateTask = useCallback(
    async (inputValue, id) => {
      if (!inputValue || !id) {
        console.log('Невозможно обновить задачу: отсутствует ID или текст');
        return;
      }

      const updateListRef = ref(db, `todos/${id}`);
      set(updateListRef, { title: inputValue })
        .then(() => {
          console.log('Задача обновлена с id', id);
        })
        .catch((error) => {
          console.error('Ошибка при обновлении задачи:', error);
        })
        .finally(() => {
          setIsUpdate(false);
          setIsSearch(false);
          setInputValue('');
        });
    },
    [setInputValue]
  );

  return { requestEditTask, requestUpdateTask, inputRef, isUpdate, idTask };
};
