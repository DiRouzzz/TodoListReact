import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const requestDeleteTodos = (setTodos, setIsSearch, setInputValue) => {
  const requestRemoveTask = (id) => {
    setIsSearch(false);
    setInputValue('');
    console.log(id)

    const deleteListRef = ref(db, `todos/${id}`);
    remove(deleteListRef)
      .catch((error) => console.log('Ошибка при удалении задачи', error))
      .then(() => console.log('Задача удалена'));
  };

  return { requestRemoveTask };
};
