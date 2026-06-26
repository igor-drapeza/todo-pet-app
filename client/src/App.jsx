import { useState, useEffect } from "react";
import ShowModal from "./ShowModal/ShowModal";
import TodoCard from "./TodoCard/TodoCard";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [modalMode, setModalMode] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");

      if (!response.ok) {
        throw new Error("Ошибка загрузки данных");
      }

      const data = await response.json();
      setTodos(data);
    } catch (e) {
      console.error(e);
    }
  };

  const openCreateModal = () => {
    setModalMode("create");
  };

  const openEditModal = (todo) => {
    setSelectedTask(todo);
    setModalMode("edit");
  };

  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка сети: " + response.status);
      }
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error("Ошибка при отправке:", e);
    }
  };

  return (
    <>
      <section className="todos">
        <div className="todos__container container">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onUpdate={openEditModal}
              onDelete={handleDeleteRequest}
            />
          ))}
        </div>
      </section>

      <button onClick={() => openCreateModal()}>Добавить новую задачу</button>
      {modalMode == "create" && (
        <ShowModal
          action={modalMode}
          onClose={(createdTodo) => {
            setModalMode(null);
            createdTodo ? setTodos((prev) => [...prev, createdTodo]) : "";
          }}
        />
      )}
      {modalMode == "edit" && selectedTask && (
        <ShowModal
          action={modalMode}
          task={selectedTask}
          onClose={(updatedTodo) => {
            setModalMode(null);
            setTodos((prev) =>
              prev.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo,
              ),
            );
          }}
        />
      )}
    </>
  );
}

export default App;
