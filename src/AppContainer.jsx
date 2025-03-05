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
///Test
export const AppContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const { todos, setTodos, isLoading } = useRequestGetTodos();
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
  const { requestEditTask, requestUpdateTask, inputRef, isUpdate, idTask } =
    useRequestUpdateTodos(setInputValue, setIsSearch);

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
