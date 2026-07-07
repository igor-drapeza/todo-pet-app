const BASE_URL = "http://localhost:5000/api/todos";

async function requestJSON(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    let message = `Ошибка: ${res.status}`;
    try {
      const data = await res.json();
      message = data?.message || data?.error || message;
    } catch {
    }

    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return res.status === 204 ? null : res.json();
}

export async function getTodos() {
  return requestJSON(BASE_URL);
}

export async function createTodo(todo) {
  return requestJSON(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

export async function updateTodo(id, todo) {
  return requestJSON(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
}

export async function deleteTodo(id) {
  await requestJSON(`${BASE_URL}/${id}`, { method: "DELETE" });
}