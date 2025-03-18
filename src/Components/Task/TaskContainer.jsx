import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TaskLayout } from './TaskLayout';

export const TaskContainer = ({
  requestRemoveTask,
  requestUpdateTask,
  inputValue,
  isUpdate,
  requestEditTask,
  inputRef,
  changeInput,
  setTask,
  task,
  setIsUpdate,
  fetchTasks,
}) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUpdate]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/tasks/${params.id}`
        );
        if (response.status === 404) {
          navigate('/task-not-exist');
          return;
        }
        if (!response.ok) {
          throw new Error(`Ошибка при запросе задачи с id ${params.id}`);
        }
        const result = await response.json();
        setTask(result.title);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, []);

  const handleDelete = async () => {
    try {
      await requestRemoveTask(params.id);
      await fetchTasks();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  const handleUpdate = async () => {
    await requestUpdateTask(inputValue, params.id);
    await fetchTasks();
    setIsUpdate(false);
  };

  return (
    <TaskLayout
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      inputValue={inputValue}
      isUpdate={isUpdate}
      requestEditTask={requestEditTask}
      inputRef={inputRef}
      changeInput={changeInput}
      task={task}
      params={params}
      navigate={navigate}
    />
  );
};
