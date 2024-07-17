import React, { useState, useEffect } from "react";
import { fetchTasks, deleteTask } from "../../services/taskService";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";

function TaskTable() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasks();
        const transformedTasks = data.map((task) => ({
          ...task,
          status: transformStatus(task.status),
        }));
        setTasks(transformedTasks);
      } catch (err) {
        setError("Failed to fetch tasks");
      }
    };
    getTasks();
  }, []);

  const transformStatus = (status) => {
    switch (status) {
      case "DONE":
        return "CONCLUÍDA";
      case "TO_DO":
        return "PENDENTE";
      case "IN_PROGRESS":
        return "EM ANDAMENTO";
      default:
        return status;
    }
  };

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
    return format(date, "dd/MM/yyyy");
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="table-container p-6">
          <h1 className="titule mb-4">Lista de atividades</h1>
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
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
                  <td className="py-2 px-4">
                    {formatDate(task.expirationDate)}
                  </td>
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
    </>
  );
}

export default TaskTable;
