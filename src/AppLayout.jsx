import styles from './App.module.scss';
import { Link } from 'react-router-dom';

export const AppLayout = ({
  todos,
  setTodos,
  requestAddTask,
  changeInput,
  inputValue,
  requestRemoveTask,
  inputRef,
  requestEditTask,
  isUpdate,
  requestUpdateTask,
  idTask,
  searchTask,
  isSearch,
  todoSearch,
  handleSort,
  isLoading,
}) => {
  const tasksList = isSearch ? todoSearch : todos;

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
                  changeInput(e);
                  if (isSearch) searchTask(e.target.value);
                }}
              />
              {!isSearch && (
                <>
                  <button
                    className={styles.addBtn}
                    onClick={() => requestAddTask(inputValue)}
                  >
                    ➕ Добавить
                  </button>
                  <button
                    className={styles.searchBtn}
                    onClick={() => searchTask(inputValue)}
                  >
                    🔍 Поиск
                  </button>
                </>
              )}
              <button
                className={styles.sortBtn}
                onClick={() => handleSort(todos, setTodos)}
              >
                🔃 Отсортировать
              </button>
            </div>
            <ul className={styles.todoList}>
              {tasksList.map(({ id, title }) => (
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
