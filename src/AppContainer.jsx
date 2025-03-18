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
import { Route, Routes } from 'react-router-dom';
import { Task } from './Task.jsx';
import { NotFound } from './NotFound';
import { TaskNotExist } from './TaskNotExist.jsx';

export const AppContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [task, setTask] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { todos, setTodos, fetchTasks } = useRequestGetTodos(setIsLoading);

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

  const { requestEditTask, requestUpdateTask, inputRef } =
    useRequestUpdateTodos(
      setInputValue,
      setTodos,
      setIsUpdate,
      setIsSearch,
      setTask
    );

  const changeInput = ({ target }) => setInputValue(target.value);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout
            todos={todos}
            setTodos={setTodos}
            requestAddTask={requestAddTask}
            changeInput={changeInput}
            inputValue={inputValue}
            searchTask={searchTask}
            isSearch={isSearch}
            todoSearch={todoSearch}
            handleSort={handleSort}
            isLoading={isLoading}
          />
        }
      />
      <Route
        path="/task/:id"
        element={
          <Task
            requestRemoveTask={requestRemoveTask}
            requestUpdateTask={requestUpdateTask}
            requestEditTask={requestEditTask}
            inputRef={inputRef}
            inputValue={inputValue}
            isUpdate={isUpdate}
            changeInput={changeInput}
            setTask={setTask}
            task={task}
            setIsUpdate={setIsUpdate}
            fetchTasks={fetchTasks}
          />
        }
      />
      <Route path="/task-not-exist" element={<TaskNotExist />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
