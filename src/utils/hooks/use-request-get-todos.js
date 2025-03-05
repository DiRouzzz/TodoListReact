import { useState, useEffect } from 'react';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { db } from '../../firebase.js';

export const useRequestGetTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Запрашиваем задачи с сортировкой по title
    const todoListQuery = query(ref(db, 'todos'), orderByChild('title'));

    return onValue(todoListQuery, (snapshot) => {
      if (!snapshot.exists()) {
        setTodos([]);
        setIsLoading(false);
        return;
      }

      const loadedList = [];
      snapshot.forEach((childSnapshot) => {
        loadedList.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });

      setTodos(loadedList);
      setIsLoading(false);
    });
  }, []);

  return { todos, setTodos, isLoading };
};
