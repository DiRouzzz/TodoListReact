import { useRef } from 'react';
import styles from './App.module.scss';
import { Link } from 'react-router-dom';
import { clearSearch } from '../../store/todoSlice';

export const AppLayout = ({
  handleAddTodo,
  handleInputChange,
  todos,
  isLoading,
  isSearch,
  inputValue,
  searchMode,
  dispatch,
  searchResults,
  sortTodos,
}) => {
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
                value={inputValue}
                type="text"
                placeholder={
                  isSearch ? 'Поиск задачи...' : 'Добавить новую задачу...'
                }
                onChange={(e) => handleInputChange(e)}
              />
              {!isSearch && (
                <>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddTodo(inputValue)}
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
                <button
                  className={styles.cancelSearch}
                  onClick={() => dispatch(clearSearch())}
                >
                  ❌ Отменить поиск
                </button>
              )}
            </div>
            <ul className={styles.todoList}>
              {tasksToDisplay.map(({ id, title }) => (
                <li key={id}>
                  <Link to={`/task/${id}`} className={styles.link}>
                    <span className={styles.taskText}>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </form>
    </div>
  );
};
