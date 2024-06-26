import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentUpdateTask, setCurrentUpdateTask] = useState(null);

  const refreshTasks = async () => {
    console.log("refreshTasks");
    try {
      const response = await axios.get("https://task-management-backend-alpha-nine.vercel.app/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("There was an error fetching the tasks!", error);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const deleteTask = async (taskId) => {
    console.log(taskId);
    try {
      await axios.delete(`https://task-management-backend-alpha-nine.vercel.app/tasks/${taskId}`);
      refreshTasks();
      setCurrentTask(null);
    } catch (error) {
      console.log("There was an error deleting the task!", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Task Management Application
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TaskList
            tasks={tasks}
            setCurrentTask={(val) => {
              setCurrentTask(val);
              setCurrentUpdateTask(null);
            }}
            deleteTask={deleteTask}
            setUpdateTask={setCurrentUpdateTask}
          />
          <TaskForm
            currentTask={currentUpdateTask}
            setCurrentTask={setCurrentUpdateTask}
            refreshTasks={refreshTasks}
          />
        </div>
        {currentTask && (
          <TaskDetails task={currentTask} setCurrentTask={setCurrentTask} />
        )}
      </div>
    </div>
  );
}

export default App;
