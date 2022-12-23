import useaddTodo from './components/hooks/usaaddTodo';

export default function Addtodo() {
  const { onclick, onsubmit, newTodoRef } = useaddTodo();
  return (
    <form onSubmit={onsubmit}>
      <input ref={newTodoRef}></input>
      <button type="submit" onClick={onclick}>
        추가
      </button>
    </form>
  );
}
