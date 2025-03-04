export const requestPostTodos = (setTodos, setInputValue, setIsSearch) => {
  const requestAddTask = async (inputValue) => {
    if (!inputValue) {
      return;
    }
    setIsSearch(false);
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ title: inputValue.trim() }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении задачи');
      }

      const result = await response.json();
      console.log('Задача успешно добавлена! ', result.title);
      setTodos((prevTodos) => [...prevTodos, result]);
      setInputValue('');
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  return { requestAddTask };
};
