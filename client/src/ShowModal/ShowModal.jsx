import { useState, useEffect } from "react";
import "./ShowModal.css";

function ShowModal({ action, task, onClose, onSuccess, onError }) {
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/todos/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: todo,
            status,
          }),
        },
      );
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const updatedTask = await response.json();

      onSuccess?.(`Задача "${updatedTask.title}" успешно обновлена`);
    } catch (e) {
      onError?.(e.message);
    } finally {
      onClose({
        id: task.id,
        title: todo,
        status,
      });
      setLoading(false);
    }
  };
  const handlePostRequest = async (e) => {
    e.preventDefault();
    let data = null;
    try {
      if (todo.trim() == "") {
        throw new Error("Поле с названием не должно быть пустым!");
      }
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка сети: " + response.status);
      }
      data = await response.json();
      console.log(data)
    } catch (e) {
      onError?.(e.message);
    } finally {
      onClose(data);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <form
          className="modal-content"
          onSubmit={action === "edit" ? handleUpdate : handlePostRequest}
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

export default ShowModal;
