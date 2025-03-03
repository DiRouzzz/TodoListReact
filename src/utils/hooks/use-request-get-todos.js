import { useState, useEffect } from 'react';

export const useRequestGetTodos = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
          throw new Error('Ошибка запроса');
        }
        const result = await response.json();
        console.log('запрос');
        setTimeout(() => {
          setTodos(result);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  return { todos, setTodos, isLoading };
};
