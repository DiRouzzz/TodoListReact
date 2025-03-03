import { useState } from 'react';

export const useSearchTodos = (todos, setIsSearch) => {
  const [todoSearch, setTodosSearch] = useState([]);

  const searchTask = (inputValue) => {
    setIsSearch(true);
    const searchTodos = todos.filter(({ title }) =>
      title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setTodosSearch(searchTodos);
  };
  return { todoSearch, searchTask };
};
