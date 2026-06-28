import { useEffect, useState } from "react";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "./../api/todos";

export function useTodos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        loadTodos();
    }, []);

    async function loadTodos() {
        const data = await getTodos();
        setTodos(data);
    }

    async function add(todo) {
        const created = await createTodo(todo);
        setTodos((prev) => [...prev, created])
    }

    async function update(id, todo) {
        const updated = await updateTodo(id, todo);
        setTodos((prev) =>
            prev.map((item) =>
                item.id === updated.id ? updated : item
            )
        );
    }

    async function remove(id) {
        await deleteTodo(id);
        setTodos((prev) =>
            prev.filter((todo) =>
                todo.id !== id
            )
        );
    }

    return {
        todos,
        add,
        update,
        remove,
    };
}