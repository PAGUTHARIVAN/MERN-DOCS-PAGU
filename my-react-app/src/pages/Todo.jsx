import { useState, useRef, useEffect } from "react";

export function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  const [err, setErr] = useState({});
  const taskRef = useRef(null);

  useEffect(() => {
    taskRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setNewTodo(e.target.value);
    setErr("");
  };
  const addTodo = () => {
    const newErr = {};
    const text = newTodo.trim();
    if (!text) {
      newErr.inputFail = "Empty field! Please enter task before add!";
      setErr(newErr);
      return;
    }
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), taskItem: text, done: false },
    ]);
    setNewTodo("");
    taskRef.current.focus();
  };
  const removeTodo = (taskId) =>
    setTodos((prev) => prev.filter((task) => task.id !== taskId));
  const toggleDone = (taskId) => {
    setTodos((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    );
  };
  const visibleTodos = todos.filter((t) => {
    if (filter === "done") return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });
  const doneCount = todos.filter((t) => t.done).length;

  return (
    <>
      <div className="todo-container">
        <h1 className="title">Todo App</h1>
        <div className="inputs-container">
          <input
            ref={taskRef}
            type="text"
            value={newTodo}
            name="newtodo"
            id="input-field"
            onChange={handleChange}
            placeholder="Add Task..."
          />
          <button onClick={addTodo}>Add Task</button>
        </div>
        <div className="filter-container">
          {["all", "done", "pending"].map((f) => (
            <button
              className={filter === f ? "filter-btn active" : "filter-btn"}
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        {err.inputFail && <p style={{ color: "red" }}>{err.inputFail}</p>}
        <div className="list-container">
          {todos.length === 0 ? (
            <p className="no-todo">No todos yet!</p>
          ) : visibleTodos.length === 0 ? (
            <p className="filter-sign">No {filter} yet!</p>
          ) : (
            <ul>
              {visibleTodos.map((task) => (
                <li key={task.id} className="list-todo">
                  <span
                    onClick={() => toggleDone(task.id)}
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                  >
                    {task.taskItem}
                  </span>
                  <button onClick={() => removeTodo(task.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p style={{ color: "greenyellow", fontWeight: "bold" }}>
          {todos.length} total, {doneCount} done
        </p>
      </div>
    </>
  );
}
