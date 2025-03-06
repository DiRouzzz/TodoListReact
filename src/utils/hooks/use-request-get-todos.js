import { useState, useEffect } from 'react';
import { ref, onValue,} from 'firebase/database';
import { db } from '../../firebase.js';

export const useRequestGetTodos = (setIsLoading) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const todoListRef = ref(db, 'todos');

    return onValue(todoListRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todosArray = Object.entries(data).map(([id, task]) => ({
          id,
          ...task,
        }));
        setTodos(todosArray);
      } else {
        setTodos([]);
      }
      setIsLoading(false);
    });
  }, []);

  return { todos, setTodos };
};