import TodoCard from "./../TodoCard/TodoCard";
import "./TodoList.css";

export default function TodoList({
  todos,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <div className="todos__container container">
        {todos.length == 0 ? 'Давай добавим задачи прямо сейчас!' :
        todos.filter(todo => todo).map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}