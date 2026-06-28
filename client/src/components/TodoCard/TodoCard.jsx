
export default function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <>
      <div className="todo" key={todo.id}>
        <h4 className="todo__title">{todo.title}</h4>
        <h6 className="todo__id">{todo.id}</h6>
        <h6 className="todo__status">{todo.status ? "true" : "false"}</h6>
        <button onClick={() => onEdit(todo)}>Изменить</button>
        <button onClick={() => onDelete(todo.id)}>Удалить</button>
      </div>
    </>
  );
}
