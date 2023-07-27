"use client";
import  useStore  from "../store";
import { useState } from "react";

export default function TodoForm() {
  const addTodo = useStore((state) => state.addTodo);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const handleCreateTodo = async () => {
    if (newTodo.length === 0) return alert("Todo input must not be empty");
    try {
      setLoading(true);
      const todo = { title: newTodo };
      await addTodo(todo);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="border rounded px-4 py-2 w-96"
        placeholder="Enter a new todo item"
      />
      <button
        disabled={loading}
        className={`px-4 py-2 text-white rounded ${
          loading ? "bg-gray-400" : "bg-green-500"
        }`}
        onClick={handleCreateTodo}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </div>
  );
}
