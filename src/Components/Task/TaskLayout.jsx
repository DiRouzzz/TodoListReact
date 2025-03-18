import styles from './Task.module.scss';

export const TaskLayout = ({
  handleDelete,
  handleUpdate,
  inputValue,
  task,
  isUpdate,
  inputRef,
  changeInput,
  navigate,
  params,
  requestEditTask
}) => {
  return (
    <>
      <title>Дело</title>
      <div className={styles.container}>
        {isUpdate ? (
          <button className={styles.backBtn} onClick={handleUpdate}>
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
              onChange={(e) => changeInput(e)}
            />
            <button className={styles.editBtn} onClick={handleUpdate}>
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
