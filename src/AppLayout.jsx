import styles from './App.module.css';

export const AppLayout = ({
	todos,
	requestAddTask,
	changeInput,
	inputValue,
	requestRemoveTask,
	inputRef,
	requestEditTask,
	handleSubmit,
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
			<form onSubmit={handleSubmit}>
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
								type='text'
								placeholder='Добавить новую задачу...'
								onChange={changeInput}
							/>
							{isUpdate ? (
								<button
									className={styles.editBtn}
									onClick={() => requestUpdateTask(inputValue, idTask)}>
									✏️ Изменить
								</button>
							) : (
								<>
									<button
										className={styles.addBtn}
										onClick={() => requestAddTask(inputValue)}>
										➕ Добавить
									</button>
									<button
										className={styles.searchBtn}
										onClick={() => searchTask(inputValue)}>
										🔍 Поиск
									</button>
									<button className={styles.sortBtn} onClick={handleSort}>
										🔃 Отсортировать
									</button>
								</>
							)}
						</div>
						<ul className={styles.todoList}>
							{tasksList.map(({ id, title }) => (
								<li key={id}>
									<span className={styles.taskText}>{title}</span>
									<div className={styles.taskButtons}>
										<button
											className={styles.editBtn}
											onClick={() => requestEditTask(id)}>
											✏️ Редактировать
										</button>
										<button
											className={styles.deleteBtn}
											onClick={() => requestRemoveTask(id)}>
											❌ Удалить
										</button>
									</div>
								</li>
							))}
						</ul>
					</>
				)}
			</form>
		</div>
	);
};
