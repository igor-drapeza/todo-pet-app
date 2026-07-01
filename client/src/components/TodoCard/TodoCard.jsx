import "./TodoCard.css";

export default function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <>
      <div className="todo" onClick={() => onEdit(todo)}>
        <h4 className="todo__title">{todo.status ? "✅" : "❌"}{todo.title}</h4>
        <p className="todo__title-description">Описание: </p>
        <p className="todo__description">{todo.description}</p>
        <div className="todo__action">
          <button className="todo__btn edit-btn btn" onClick={(e) => {
            e.stopPropagation();
            onEdit(todo);
          }}>Изменить</button>
          <button button className="todo__btn delete-btn btn" onClick={(e) => {
            e.stopPropagation();
            onDelete(todo.id);
          }}>Удалить</button>
        </div>
      </div>
    </>
  );
}
