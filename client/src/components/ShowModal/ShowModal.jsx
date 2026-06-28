import { useState, useEffect } from "react";
import "./ShowModal.css";

export default function ShowModal({ action, task, onClose, onSubmit }) {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTodo(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || false);
    }
  }, [task]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      id: task?.id,
      title: todo,
      description,
      status,
      action,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <form
          className="modal-content"
          onSubmit={handleSubmit}
        >
          {action == "edit" ? (
            <h2 className="modal-content__title">💡 Редактирование записи</h2>
          ) : (
            <h2 className="modal-content__title">💡 Создание новой записи</h2>
          )}

          {action == "edit" ? (
            <p className="modal-content__id">ID: {task.id}</p>
          ) : (
            ""
          )}

          <div className="modal-content__label">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />

            <input
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="modal-content__label">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="modal-content__buttons">
            <button type="submit" disabled={loading}>
              {loading
                ? "Сохранение..."
                : action == "edit"
                  ? "Изменить"
                  : "Создать"}
            </button>

            <button type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}