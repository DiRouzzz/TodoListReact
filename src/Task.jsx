import { useParams, useNavigate } from 'react-router-dom';
import styles from './Task.module.scss';
import { useEffect } from 'react';

export const Task = ({
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
        if (!response.ok) {
          throw new Error('Ошибка при запросе задачи с id', params.id);
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
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  return (
    <>
      <title>Дело</title>
      <div className={styles.container}>
        <button className={styles.backBtn} onClick={() => {
          navigate(-1);
          setIsUpdate(false);
        }}>
          Назад
        </button>
        <h1>Страница Дела</h1>
        {isUpdate ? (
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => changeInput(e)}
            />
            <button
              className={styles.editBtn}
              onClick={() => requestUpdateTask(inputValue, params.id)}
            >
              ✏️ Изменить
            </button>
          </div>
        ) : (
          <div className={styles.task}>
            <span className={styles.taskText}>{task}</span>
            <div className={styles.taskButtons}>
              <button
                className={styles.editBtn}
                onClick={() => requestEditTask(params.id)}
              >
                ✏️ Редактировать
              </button>
              <button className={styles.deleteBtn} onClick={handleDelete}>
                ❌ Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
