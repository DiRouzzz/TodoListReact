import { useRef, useEffect } from 'react';
import styles from './Task.module.scss';

export const TaskLayout = ({
  isUpdate,
  navigate,
  handleUpdateTodo,
  inputValue,
  handleDeleteTodo,
  todoItem,
  isLoadingTodo,
  handleGetTodo,
  handleInputChange,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isUpdate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUpdate]);

  return (
    <>
      <title>Дело</title>
      <div className={styles.container}>
        {isUpdate ? (
          <button
            className={styles.backBtn}
            onClick={() => {
              handleUpdateTodo(false);
              navigate('/');
            }}
          >
            💾 Сохранить и Назад
          </button>
        ) : (
          <button className={styles.backBtn} onClick={() => navigate('/')}>
            ↩️ Назад
          </button>
        )}
        <h1>Страница Дела</h1>
        {isUpdate ? (
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e)}
            />
            <button
              className={styles.editBtn}
              onClick={() => handleUpdateTodo(true)}
            >
              ✏️ Изменить
            </button>
          </div>
        ) : (
          <div className={styles.task}>
            <span className={styles.taskText}>
              {isLoadingTodo ? 'загрузка задачи...' : todoItem?.title}
            </span>
            <div className={styles.taskButtons}>
              <button
                className={styles.editBtn}
                onClick={() => handleGetTodo(todoItem)}
              >
                ✏️ Редактировать
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => {
                  handleDeleteTodo(todoItem.id);
                  navigate('/');
                }}
              >
                ❌ Удалить
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
