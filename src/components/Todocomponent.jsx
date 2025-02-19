import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { useParams } from "react-router-dom";
import "../design/Todo.css"; // Ensure this file has modern styling

const client = generateClient();

function Todocomponent() {
  const { category } = useParams(); // Get the category from the URL
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const subscription = client.models.Note.observeQuery().subscribe({
      next: (data) => setTodos(data.items ?? []),
    });

    return () => subscription.unsubscribe(); // Cleanup function
  }, []);

  // Filter todos based on the selected category from the URL
  const filteredTodos = todos.filter(todo => todo.category === category);

  function isNewComment(lastChangedAt) {
    if (!lastChangedAt) return false;
    const currentTime = new Date().getTime();
    const commentTime = new Date(lastChangedAt).getTime();
    return currentTime - commentTime < 2 * 60 * 1000; // Check if it's within the last 2 minutes
  }

  function createTodo() {
    const content = window.prompt("Enter a new todo:");
    if (!content) return;

    const newTodo = {
      content,
      category,
      likes: 0,
      dislikes: 0,
    };

    client.models.Note.create(newTodo)
    .then(() => {
      // Update the state with the new todo
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Add the new todo to the existing ones
      console.log("New todo created");
    })
    .catch((error) => console.error("Error creating todo:", error));
  }

  function updateTodo(id, changes) {
    client.models.Note.update({ id, ...changes })
      .then(() => client.models.Note.list())
      .then((data) => setTodos(data.data ?? []))
      .catch((error) => console.error("Error updating todo:", error));
  }

  function deleteTodo(id, likes, dislikes) {
    if (dislikes > likes) {
      client.models.Note.delete({ id })
        .then(() => setTodos((prev) => prev.filter((todo) => todo.id !== id)))
        .catch((error) => console.error("Error deleting todo:", error));
    } else {
      alert("Cannot delete: dislikes must be greater than likes.");
    }
  }

  return (
    <main className="todo-container">
      <h1>{category} Todos</h1>
      <button className="add-btn" onClick={createTodo}>+ New</button>
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li key={todo.id || todo.content + todo.createdAt} className={`todo-item ${todo.isDone ? "done" : ""}`}>
            <span className="todo-dot" style={{ visibility: isNewComment(todo.createdAt) ? "visible" : "hidden" }}></span>
            <span>{todo.content}</span>

            <div className="actions">
              <button className="likes-dislikes" onClick={() => updateTodo(todo.id, { likes: (todo.likes || 0) + 1 })}>👍 {todo.likes || 0}</button>
              <button className="likes-dislikes" onClick={() => updateTodo(todo.id, { dislikes: (todo.dislikes || 0) + 1 })}>👎 {todo.dislikes || 0}</button>
              <button onClick={() => updateTodo(todo.id, { isDone: !todo.isDone })}>✅</button>
              <button onClick={() => deleteTodo(todo.id, todo.likes || 0, todo.dislikes || 0)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="footer">
        🎉 LL&L is live! Try adding a new comment!
      </div>
    </main>
  );
}

export default Todocomponent;
