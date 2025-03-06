import { useState } from 'react';
import { AppLayout } from './AppLayout';
import {
  useRequestGetTodos,
  useRequestUpdateTodos,
  useSearchTodos,
} from './utils/hooks';
import { requestDeleteTodos } from './utils/request-delete-todos';
import { requestPostTodos } from './utils/request-post-todos.js';
import { handleSort } from './utils/handleSort.js';

export const AppContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { todos, setTodos } = useRequestGetTodos(setIsLoading);
  const { todoSearch, isSearch, setIsSearch, searchTask } = useSearchTodos(
    todos,
    setTodos
  );
  const { requestAddTask } = requestPostTodos(
    setTodos,
    setInputValue,
    setIsSearch
  );
  const { requestRemoveTask } = requestDeleteTodos(
    setTodos,
    setIsSearch,
    setInputValue
  );
  const { requestEditTask, requestUpdateTask, inputRef, idTask } =
    useRequestUpdateTodos(setInputValue, setTodos, setIsUpdate);

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
