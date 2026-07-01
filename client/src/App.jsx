import { useState } from "react";
import ShowModal from "./components/ShowModal/ShowModal";
import TodoList from "./components/TodoList/TodoList";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { todos, add, update, remove } = useTodos();
  const [selectedTodos, setSelectedTodos] = useState('all');
  const [sortOrder, setSortOrder] = useState("unfinished-first");
  const [modal, setModal] = useState({
    mode: null,
    task: null,
  });

  const openCreateModal = () => {
    setModal({ mode: "create", task: null });
  };

  const openEditModal = (task) => {
    setModal({ mode: "edit", task });
  };

  const handleSubmit = async (data) => {
    if (modal.mode === "create") {
      await add(data);
    } else {
      await update(modal.task.id, data);
    }

    closeModal();
  };

  const handleChangeSelected = (event) => {
    setSelectedTodos(event.target.value);
  }
  const filteredTodos = [...todos]
    .filter((todo) => {
      switch (selectedTodos) {
        case "successful":
          return todo.status;
        case "unsuccessful":
          return !todo.status;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortOrder === "unfinished-first") {
        return Number(a.status) - Number(b.status);
      }
      return Number(b.status) - Number(a.status);
    });

  return (
    <>
      <header className="header">
        <div className="header__container container">
          <button className="header__btn create-btn btn"
            onClick={openCreateModal}>
            Добавить задачу
          </button>

          <label className="label__filter">Выбрать задачи:</label>
          <select value={selectedTodos} onChange={handleChangeSelected}>
            <option value="all"> ––– Все задачи –––</option>
            <option value="successful">Выполненные</option>
            <option value="unsuccessful">Не выполненные</option>
          </select>

          <label>Сортировка:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="unfinished-first">
              Сначала не выполненные
            </option>
            <option value="finished-first">
              Сначала выполненные
            </option>
          </select>
        </div>
      </header>
      <TodoList
        todos={filteredTodos}
        onEdit={openEditModal}
        onDelete={remove}
      />

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
