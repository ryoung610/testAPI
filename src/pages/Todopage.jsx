import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import "../design/Todo.css";

const client = generateClient();

const categoryMap = {
  business: "Business & IT Services",
  relationships: "Relationships & Lifestyle",
  tech: "Innovative Tech Projects",
  arts: "Creative Arts & Design"
};

function Todopage() {
  const { category } = useParams();  // Get category from URL
  const categoryName = categoryMap[category] || "Unknown Category";

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const subscription = client.models.Note.observeQuery({
      filter: { category: { eq: categoryName } }  // Fetch todos for this category
    }).subscribe({
      next: (data) => setTodos(data.items ?? []),
    });

    return () => subscription.unsubscribe();
  }, [category]);

  function createTodo() {
    const content = window.prompt("Enter a new todo:");
    if (!content) return;

    client.models.Note.create({ content, likes: 0, dislikes: 0, category: categoryName })
      .then(() => console.log("New todo created"))
      .catch((error) => console.error("Error creating todo:", error));
  }

  return (
    <main className="todo-container">
      <h1>{categoryName}</h1>
      <button className="add-btn" onClick={createTodo}>+ New</button>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.isDone ? "done" : ""}`}>
            <span>{todo.content}</span>
            <div className="actions">
              <button onClick={() => console.log("Like logic here")}>👍 {todo.likes || 0}</button>
              <button onClick={() => console.log("Dislike logic here")}>👎 {todo.dislikes || 0}</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Todopage