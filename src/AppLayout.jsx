import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodo,
  editTodo,
  sortTodos,
  searchMode,
  clearSearch,
} from './store/todoSlice';
import styles from './App.module.css';
import { useRef } from 'react';

export const AppLayout = ({
  handleActionAddTodo,
  handleInputChange,
  handleUpdateTask,
}) => {
  const {
    todos,
    isLoading,
    isUpdate,
    inputValue,
    idTask,
    searchResults,
    isSearch,
  } = useSelector((state) => state.todos);

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const tasksToDisplay = isSearch ? searchResults : todos;

  return (
    <div className={styles.container}>
      <form onSubmit={(event) => event.preventDefault()}>
        <h1>📋 Мой список дел</h1>

        {isLoading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <>
            <div className={styles.todoForm}>
              <input
                ref={inputRef}
                value={inputValue}
                type="text"
                placeholder={
                  isSearch ? 'Поиск задачи...' : 'Добавить новую задачу...'
                }
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              {isUpdate ? (
                <button
                  className={styles.editBtn}
                  onClick={() =>
                    handleUpdateTask({ id: idTask, title: inputValue })
                  }
                >
                  ✏️ Изменить
                </button>
              ) : (
                <>
                  {!isSearch && (
                    <>
                      <button
                        className={styles.addBtn}
                        onClick={handleActionAddTodo}
                      >
                        ➕ Добавить
                      </button>
                      <button
                        className={styles.searchBtn}
                        onClick={() => dispatch(searchMode())}
                      >
                        🔍 Поиск
                      </button>
                    </>
                  )}
                  <button
                    className={styles.sortBtn}
                    onClick={() => dispatch(sortTodos())}
                  >
                    🔃 Отсортировать
                  </button>
                  {isSearch && (
                    <button onClick={() => dispatch(clearSearch())}>
                      Отменить поиск
                    </button>
                  )}
                </>
              )}
            </div>
            {!isUpdate && (
              <ul className={styles.todoList}>
                {tasksToDisplay.map(({ id, title }) => (
                  <li key={id}>
                    <span className={styles.taskText}>{title}</span>
                    <div className={styles.taskButtons}>
                      <button
                        className={styles.editBtn}
                        onClick={() => dispatch(editTodo(id))}
                      >
                        ✏️ Редактировать
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => dispatch(deleteTodo(id))}
                      >
                        ❌ Удалить
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </form>
    </div>
  );
};
