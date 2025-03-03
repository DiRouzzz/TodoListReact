import { useState, useMemo } from 'react';
import { debounce } from '../debounce';

export const useSearchTodos = (todos) => {
  const [todoSearch, setTodosSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const searchTask = (inputValue) => {
    setIsSearch(true);
    const searchTodos = todos.filter(({ title }) =>
      title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setTodosSearch(searchTodos);
  };

  const debouncedSearchTask = useMemo(() => debounce(searchTask, 300), [todos]);

  return {
    todoSearch,
    setTodosSearch,
    isSearch,
    setIsSearch,
    searchTask: debouncedSearchTask,
  };
};
