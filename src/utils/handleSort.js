export const handleSort = (todos, setTodos, order = 'asc') => {
  const sortedTodos = [...todos].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (order === 'asc') return titleA.localeCompare(titleB);
    return titleB.localeCompare(titleA);
  });

  setTodos(sortedTodos);
};
