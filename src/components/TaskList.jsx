import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskList({ setCurrentTask, deleteTask, tasks, setUpdateTask }) {
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.dueDate}</p>
              </div>
              <div>
                <button
                  onClick={() => setCurrentTask(task)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                >
                  Delete
                </button>

                <button
                  onClick={() => setUpdateTask(task)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
