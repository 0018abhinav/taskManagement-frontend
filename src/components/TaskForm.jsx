import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskForm({ currentTask, setCurrentTask, refreshTasks }) {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({ title: "", description: "", dueDate: "" });
    }
  }, [currentTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTask) {
      try {
        await axios.patch(
          `https://task-management-backend-alpha-nine.vercel.app/tasks/${currentTask._id}`,
          task
        );
        refreshTasks();
        setCurrentTask(null);
      } catch (error) {
        console.error("There was an error updating the task!", error);
      }
    } else {
      try {
        await axios.post("https://task-management-backend-alpha-nine.vercel.app/tasks", task);
        refreshTasks();
      } catch (error) {
        console.error("There was an error creating the task!", error);
      }
    }
    setTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {currentTask ? "Edit Task" : "Add Task"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {currentTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
