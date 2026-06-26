import { useState, useEffect } from "react";
import React from "react";
import ShowModal from "./../ShowModal/ShowModal";

export default function TodoCard({ todo, onEdit, onUpdate, onDelete }) {
  return (
    <>
      <div className="todo-task" key={todo.id}>
        <h4 className="todo-task__title">{todo.title}</h4>
        <h6 className="todo-task__id">{todo.id}</h6>
        <h6 className="todo-task__status">{todo.status ? "true" : "false"}</h6>
        <button onClick={() => onUpdate(todo)}>Изменить</button>
        <button onClick={() => onDelete(todo.id)}>Удалить</button>
      </div>
    </>
  );
}
