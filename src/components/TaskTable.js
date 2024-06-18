import React, { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./styles.css"; // Adjust the import path as necessary

function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError("Failed to fetch tasks");
      }
    };
    getTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy"); // Format date as dd/MM/yyyy
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}
      <div className="table-container">
        <table className="min-w-full bg-white border">
          <thead className="table-header">
            <tr>
              <th className="py-2 text-center">Título</th>
              <th className="py-2 text-center">Descrição</th>
              <th className="py-2 text-center">Status</th>
              <th className="py-2 text-center">Data criação</th>
              <th className="py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {tasks.map((task) => (
              <tr key={task.id} className="border-t table-row text-center">
                <td className="py-2 px-4">{task.title}</td>
                <td className="py-2 px-4">{task.description}</td>
                <td className="py-2 px-4">{task.status}</td>
                <td className="py-2 px-4">{formatDate(task.expirationDate)}</td>
                <td className="py-2 px-4 table-actions">
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="p-2 mr-2 edit-button rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 delete-button rounded"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
