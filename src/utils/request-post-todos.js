import { ref, push } from 'firebase/database';
import { db } from '../firebase.js';
export const requestPostTodos = (setTodos, setInputValue, setIsSearch) => {
  const requestAddTask = (inputValue) => {
    if (!inputValue) {
      return;
    }
    setIsSearch(false);

    const addTodosRef = ref(db, 'todos');
    push(addTodosRef, {
      title: inputValue,
    })
      .then((res) => {
        console.log('Задача успешно добавлена!', res);
        setInputValue('');
      })
      .catch((err) => {
        console.log('Ошибка при добавлении задачи', err);
      });
  };

  return { requestAddTask };
};
