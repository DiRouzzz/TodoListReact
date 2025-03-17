import { useState, useEffect } from 'react';

export const useRequestGetTodos = (setIsLoading) => {
  const [todos, setTodos] = useState([]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/tasks');
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      const result = await response.json();
      setTodos(result);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { todos, setTodos, fetchTasks };
};
