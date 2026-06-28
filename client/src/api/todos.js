const BASE_URL = "http://localhost:5000/api/todos";

export async function  getTodos() {
    const respone = await fetch(BASE_URL);

    if (!respone.ok) {
        throw new Error("Ошибка загрузки");
    }

    return respone.json();
}

export async function createTodo(todo) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Ошибка создания");
  }

  return response.json();
}

export async function updateTodo(id, todo) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Ошибка обновления");
  }

  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка удаления");
  }
}