import { useEffect, useRef, useState } from 'react';
import { AppLayout } from './AppLayout';
export const AppContainer = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);
	const [idTask, setIdTask] = useState('');
	const [isSearch, setIsSearch] = useState(false);
	const [todoSearch, setTodosSearch] = useState([]);
	const inputRef = useRef(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch('http://localhost:3000/tasks');
				if (!response.ok) {
					throw new Error('Ошибка запроса');
				}
				const result = await response.json();
				setTodos(result);
			} catch (error) {
				console.error(error);
			}
		};

		fetchTasks();
	}, []);

	const changeInput = ({ target }) => {
		setInputValue(target.value);
	};

	const requestAddTask = async value => {
		setIsSearch(false);
		try {
			const response = await fetch('http://localhost:3000/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: value }),
			});

			if (!response.ok) {
				throw new Error('Ошибка при добавлении задачи');
			}

			const result = await response.json();
			console.log('Задача успешно добавлена! ', result.title);
			setTodos(prevTodos => [...prevTodos, result]);
			setInputValue('');
		} catch (error) {
			console.error('Ошибка при добавлении задачи:', error);
		}
	};

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

	const requestEditTask = async id => {
		setIsUpdate(true);
		inputRef.current.focus();
		
		try {
			const response = await fetch(`http://localhost:3000/tasks/${id}`);
			if (!response.ok) {
				throw new Error('Ошибка при запросе задачи');
			}

			const result = await response.json();
			setIdTask(result.id);
			setInputValue(result.title);
			console.log('value ', inputRef.current);
			
		} catch (error) {
			console.error(error);
		}
	};

	const requestUpdateTask = async (inputValue, id) => {
		try {
			const response = await fetch(`http://localhost:3000/tasks/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: inputValue,
				}),
			});
			if (!response.ok) {
				throw new Error('Ошибка при обновлении задачи');
			}
			const updatedTask = await response.json();
			setTodos(prevTodos =>
				prevTodos.map(todo => (todo.id === id ? updatedTask : todo))
			);
			console.log('Задача успешно изменена! на', updatedTask.title);
			setIsUpdate(false);
			setInputValue('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
	};

	const searchTask = inputValue => {
		setIsSearch(true);
		const searchTodos = todos.filter(({ title }) =>
			title.toLowerCase().includes(inputValue.toLowerCase())
		);
		console.log(searchTodos);
		setTodosSearch(searchTodos);
	};

	const handleSort = () => {
		setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
	};

	return (
		<AppLayout
			todos={todos}
			requestAddTask={requestAddTask}
			changeInput={changeInput}
			inputValue={inputValue}
			requestRemoveTask={requestRemoveTask}
			inputRef={inputRef}
			requestEditTask={requestEditTask}
			handleSubmit={handleSubmit}
			isUpdate={isUpdate}
			requestUpdateTask={requestUpdateTask}
			idTask={idTask}
			searchTask={searchTask}
			isSearch={isSearch}
			todoSearch={todoSearch}
			handleSort={handleSort}
		/>
	);
};
