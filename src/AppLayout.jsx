import { useDispatch, useSelector } from 'react-redux';
import { sortTodos, searchMode, clearSearch } from './store/todoSlice';
import styles from './App.module.css';
import { useRef } from 'react';

export const AppLayout = ({
  handleAddTodo,
  handleDeleteTodo,
  handleInputChange,
  handleGetTodo,
  handleUpdateTodo,
  todos,
  isLoading,
}) => {
  const { isUpdate, inputValue, searchResults, isSearch } = useSelector(
    (state) => state.todos
  );

  const dispatch = useDispatch();
  const inputRef = useRef(null);
  console.log('ref', inputRef);

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
                <button className={styles.editBtn} onClick={handleUpdateTodo}>
                  ✏️ Изменить
                </button>
              ) : (
                <>
                  {!isSearch && (
                    <>
                      <button className={styles.addBtn} onClick={handleAddTodo}>
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
                    <button
                      className={styles.cancelSearch}
                      onClick={() => dispatch(clearSearch())}
                    >
                      ❌ Отменить поиск
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
                        onClick={() => {
                          handleGetTodo({ id, title });
                          inputRef.current.focus();
                        }}
                      >
                        ✏️ Редактировать
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteTodo(id)}
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
