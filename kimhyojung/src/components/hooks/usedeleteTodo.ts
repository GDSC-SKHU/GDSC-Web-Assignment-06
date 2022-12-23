import airtableInstance from '../../lib/api/airtableapi';

const usedeleteTodo = (id: string) => {
  const deleteData = async () => {
    await airtableInstance.delete(`/todos/${id}`);
  };
  deleteData();
};

export default usedeleteTodo;
