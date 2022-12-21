import airtableInstance from './airtableapi';
const deleteTodo = (id: string) => {
  airtableInstance.delete(`/todos/${id}`);
};

export default deleteTodo;
