export const requestDeleteTodos = setTodos => {
	const requestRemoveTask = async id => {
		try {
			const response = await fetch(`http://localhost:3000/tasks/${id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Ошибка удаления задачи');
			}
			console.log('Задача успешно удалена!');

			setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	return { requestRemoveTask };
};
