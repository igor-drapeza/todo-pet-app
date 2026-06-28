import { useState } from "react";
import ShowModal from "./components/ShowModal/ShowModal";
import TodoList from "./components/TodoList/TodoList";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { todos, add, update, remove } = useTodos();

  const [modal, setModal] = useState({
    mode: null,
    task: null,
  });
  
  const openCreateModal = () => {
    setModal({mode: "create", task: null});
  };

  const openEditModal = (task) => {
    setModal({mode: "edit", task});
  };

  async function handleSubmit(data) {
    if (modal.mode === "create") {
      await add(data);
    }

    if (modal.mode === "edit") {
      await update(modal.task.id, data);
    }

    setModal({
      mode: null,
      task: null,
    });
  }

  return (
    <>
      <TodoList
        todos={todos}
        onEdit={openEditModal}
        onDelete={remove}
      />
      <button onClick={openCreateModal}>Добавить новую задачу</button>

      {modal.mode && (
        <ShowModal
          action={modal.mode}
          task={modal.task}
          onSubmit={handleSubmit}
          onClose={() =>
            setModal({
              mode: null,
              task: null,
            })
          }
        />
      )}
    </>
  );
}

export default App;
