import { useState } from 'react';
import { AppLayout } from './AppLayout';
import {
  useRequestGetTodos,
  useRequestUpdateTodos,
  useSearchTodos,
  useRequestPostTodos,
} from './utils/hooks';
import { requestDeleteTodos } from './utils/request-delete-todos';
import { handleSort } from './utils/handleSort.js';

export const AppContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const { todos, setTodos, isLoading } = useRequestGetTodos();
  const { requestAddTask, isSearch, setIsSearch } = useRequestPostTodos(
    setTodos,
    setInputValue
  );
  const { requestRemoveTask } = requestDeleteTodos(
    setTodos,
    setIsSearch,
    setInputValue
  );
  const { requestEditTask, requestUpdateTask, inputRef, isUpdate, idTask } =
    useRequestUpdateTodos(setInputValue, setTodos);
  const { todoSearch, searchTask } = useSearchTodos(todos, setIsSearch);
  const changeInput = ({ target }) => {
    setInputValue(target.value);
  };

  return (
    <AppLayout
      todos={todos}
      setTodos={setTodos}
      requestAddTask={requestAddTask}
      changeInput={changeInput}
      inputValue={inputValue}
      requestRemoveTask={requestRemoveTask}
      inputRef={inputRef}
      requestEditTask={requestEditTask}
      isUpdate={isUpdate}
      requestUpdateTask={requestUpdateTask}
      idTask={idTask}
      searchTask={searchTask}
      isSearch={isSearch}
      todoSearch={todoSearch}
      handleSort={handleSort}
      isLoading={isLoading}
    />
  );
};
