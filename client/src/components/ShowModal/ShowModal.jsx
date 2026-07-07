import { useState, useEffect } from "react";
import "./ShowModal.css";

export default function ShowModal({ action, task, onClose, onSubmit }) {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (task) {
      setTodo(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || false);
    }
  }, [task]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit({
        id: task?.id,
        title: todo,
        description,
        status,
        action,
      });

      onClose();
    } catch (err) {
      setError(err?.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal__overlay">
      <div className="modal__wrapper">
      <div className="modal__wrapper-close" onClick={onClose}>⨯</div>
        <form
          className="modal__content"
          onSubmit={handleSubmit}
        >
          {action == "edit" ? (
            <h2 className="modal__content-title">💡 Редактирование записи</h2>
          ) : (
            <h2 className="modal__content-title">💡 Создание новой записи</h2>
          )}

          {action == "edit" ? (
            <p className="modal__content-id">ID: {task.id}</p>
          ) : (
            ""
          )}

          <div className="modal__content-label">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}

            />

            <input
              type="text"
              value={todo}
              placeholder="Наименование"
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>

          <div className="modal__content-label">
            <input
              type="text"
              value={description}
              placeholder="Описание задачи..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {error ? (
            <div style={{ color: "crimson", marginTop: 10, marginBottom: 10 }}>
              {error}
            </div>
          ) : null}

          <div className="modal__content-buttons">
            <button className="modal__content-btn sucsess-btn" type="submit" disabled={loading}>
              {loading
                ? "Сохранение..."
                : action == "edit"
                  ? "Изменить"
                  : "Создать"}
            </button>

            <button className="modal__content-btn cancel-btn" type="button" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}