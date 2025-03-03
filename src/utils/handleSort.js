export const handleSort = (todos, setTodos) => {
  setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
};
