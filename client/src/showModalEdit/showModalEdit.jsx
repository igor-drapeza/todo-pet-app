import { useState, useEffect } from 'react';
import './showModalEdit.css';

function ShowModalEdit({
  task,
  onClose,
  onSuccess,
  onError
}) {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setTodo(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || false);
    }
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(task.id, todo, status)
      const response = await fetch(
        `http://localhost:5000/api/todos/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: todo,
            status,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(
          `Ошибка сервера: ${response.status}`
        );
      }

      const updatedTask = await response.json();

      onSuccess?.(
        `Задача "${updatedTask.title}" успешно обновлена`
      );

    } catch (e) {
      onError?.(e.message);
    } finally {
      onClose()
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <form
          className="modal-content"
          onSubmit={handleUpdate}
        >
          <h2 className="modal-content__title">
            💡 Редактирование записи
          </h2>

          <p className="modal-content__id">
            ID: {task.id}
          </p>

          <div className="modal-content__label">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) =>
                setStatus(e.target.checked)
              }
            />

            <input
              type="text"
              value={todo}
              onChange={(e) =>
                setTodo(e.target.value)
              }
            />
          </div>

          <div className="modal-content__label">
            <input
              type="text"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="modal-content__buttons">
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Сохранение...'
                : 'Изменить'}
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShowModalEdit;