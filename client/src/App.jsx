import { useState, useEffect } from 'react'
import ShowModalEdit from './showModalEdit/showModalEdit'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [titleText, setTitleText] = useState('')
  const [titleTextEdit, setTitleTextEdit] = useState('')
  const [statusEdit, setStatusEdit] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getData()
  }, []);

  const openEditModal = (todo) => {
    setSelectedTask(todo);
    setIsEditModalOpen(true);
  };

  const handleChange = (event) => {
    setTitleText(event.target.value)
  }

  const handleChangeEdit = (event) => {
    setTitleTextEdit(event.target.value)
  }
  
  const getData = async () => {
    fetch("http://localhost:5000/api/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }

  const handlePostRequest = async () => {
    if (titleText.trim() == "") {
      throw new Error('Поле с названием не должно быть пустым!')
    }
    const payload = { title: titleText }
    try {
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.status);
      }
      setTitleText('')
      getData()
    }
    catch (e) {
      console.error(e);
    }
  }
  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`,
        {
          method: 'DELETE',
        })
      if (!response.ok) {
        throw new Error('Ошибка сети: ' + response.status);
      }
      getData()
    }
    catch (e) {
      console.error('Ошибка при отправке:', error);
    }
  }

  return (
    <>
      <section id="center">
        <div className='todos'>
          {todos.map(todo => 
            <div className='todo-task' key={todo.id}>
              <h4 className='todo-task__title'>{todo.title}</h4>
              <h6 className='todo-task__id'>{todo.id}</h6>
              <h6 className='todo-task__status'>{todo.status ? "true" : "false" }</h6>
              <button onClick={() => openEditModal(todo)}>Изменить</button>
              <button onClick={() => handleDeleteRequest(todo.id)}>Удалить</button>
            </div>
          )}
        </div>
      </section>
      <button command="show-modal" commandfor="todo-task__modal-post">Добавить новую задачу</button>

<dialog id="todo-task__modal-post">
  <p>Создание новой таски:</p>
  <form>
    <label htmlFor="title">Название задачи:</label>
    <input type="text" name="title" value={titleText} onChange={handleChange} placeholder="купить хлеб" />
  </form>
  <button commandfor="todo-task__modal-post" command="close" onClick={handlePostRequest}>Добавить</button>
</dialog>

  {
    isEditModalOpen && selectedTask && (
      <ShowModalEdit
        task={selectedTask}
        onClose={() => {
          setIsEditModalOpen(false); 
          getData();
        }}
      />
    )
  }

  </>
  )
}

export default App
