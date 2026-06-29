const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;
const FILE_PATH = "./data.json";

app.use(cors());
app.use(express.json());

function getTodos() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (e) {
    throw new Error(e);
  }
}

function saveTodos(todos) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
}

function findTask(id) {
  return getTodos().find((el) => el.id === id);
}

// GET: fetch all
app.get("/api/todos", (req, res) => {
  try {
    res.json(getTodos());
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
// GET: One task by params id
app.get("/api/todos/:id", (req, res) => {
  try {
    const task = findTask(req.params.id);
    if (!task) return res.status(404).send("Not found");
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
// POST: Create
app.post("/api/todos", (req, res) => {
  try {
    let data = getTodos();
    const uuid = uuidv4();
    if (!req.body.title?.trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newTask = {
      id: uuid,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status ?? false,
    };
    data.push(newTask);
    saveTodos(data);
    res.status(201).json(newTask);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
// PUT: Update
app.put("/api/todos/:id", (req, res) => {
  try {
    const data = getTodos();
    const task = data.find((el) => el.id === req.params.id);
    if (!task) return res.status(404).send("Error: Not found");
    if (req.body.title.trim() == "") throw new Error("Need enter text label");
    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description,
    task.status = req.body.status ?? task.status;

    saveTodos(data);
    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});
app.delete("/api/todos/:id", (req, res) => {
  try {
    let data = getTodos();
    const newData = data.filter((el) => el.id !== req.params.id);
    saveTodos(newData);
    res.status(200).json(newData);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
