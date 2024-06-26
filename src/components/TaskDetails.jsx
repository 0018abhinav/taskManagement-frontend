import React from "react";

function TaskDetails({ task, setCurrentTask }) {
  return (
    <div className="bg-white p-4 rounded shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Task Details</h2>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate}
      </p>
      <button
        onClick={() => setCurrentTask(null)}
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
      >
        Close
      </button>
    </div>
  );
}

export default TaskDetails;
