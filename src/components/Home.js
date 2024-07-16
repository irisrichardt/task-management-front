import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { fetchTasks, deleteTask } from "../services/authService"; 

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks(); // Supondo que fetchTasks é uma função que busca as tasks
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch tasks");
      }
    };
    getTasks();
  }, []);

  console.log(tasks);

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId); // Supondo que deleteTask é uma função que deleta uma task
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleDragEnd = (e, newIndex, newStatus) => {
    const draggedItem = tasks[newIndex];

    // Criar uma nova lista de atividades excluindo o item arrastado
    const newActivities = tasks.filter((task, index) => index !== newIndex);

    // Atualizar o status da atividade
    draggedItem.status = newStatus;

    // Inserir o item arrastado na nova coluna
    newActivities.push(draggedItem);

    // Atualizar o estado das atividades
    setTasks(newActivities); // <-- Correção aqui
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <button
          onClick={handleCreateTask}
          className="p-2 mb-6 bg-green-500 text-white rounded ml-8"
        >
          Criar nova atividade
        </button>
        <Dashboard activities={tasks} onDragEnd={handleDragEnd} />
      </div>
    </>
  );
}

export default Home;
