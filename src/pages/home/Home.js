import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { fetchTasks, updateTask } from "../../services/taskService";
import { IconButton, Tooltip } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import EditIcon from "@material-ui/icons/Edit";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

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

  const moveTask = async (taskId, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    try {
      await updateTask(
        taskId,
        taskToUpdate.title,
        taskToUpdate.description,
        newStatus,
        taskToUpdate.expirationDate
      );
    } catch (err) {
      setError("Failed to update task status");
      // Reverte a atualização local em caso de erro
      setTasks(tasks);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    moveTask(taskId, newStatus);
  };

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const getStatusText = (status) => {
    switch (status) {
      case "TO_DO":
        return "Pendente";
      case "IN_PROGRESS":
        return "Em andamento";
      case "DONE":
        return "Concluída";
      default:
        return status;
    }
  };

  return (
    <main>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      {error && <div className="error">{error}</div>}
      <header className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <h1>Atividades</h1>
      </header>

      <section className={`columns px-4 ${menuOpen ? "ml-64" : ""}`}>
        <section className="column">
          <div className="column__header">
            <h2 className="column__title">PENDENTES</h2>
            <Tooltip title="Criar atividade">
              <IconButton className="mr-15" onClick={handleCreateTask}>
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <section
            className="column__cards"
            onDrop={(e) => handleDrop(e, "TO_DO")}
            onDragOver={handleDragOver}
          >
            {tasks.map(
              (task) =>
                task.status === "TO_DO" && (
                  <div
                    key={task.id}
                    className="card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <div className="card__content">
                      <div className="card__text">
                        <h3>{task.title}</h3>
                        <p>Status: {getStatusText(task.status)}</p>
                        <p>Desecrição: {task.description}</p>
                      </div>
                      <Tooltip title="Editar atividade">
                        <IconButton onClick={() => handleEditTask(task.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                )
            )}
          </section>
        </section>

        <section className="column">
          <div className="column__header">
            <h2 className="column__title">EM ANDAMENTO</h2>
            <Tooltip title="Criar atividade">
              <IconButton className="mr-15" onClick={handleCreateTask}>
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <section
            className="column__cards"
            onDrop={(e) => handleDrop(e, "IN_PROGRESS")}
            onDragOver={handleDragOver}
          >
            {tasks.map(
              (task) =>
                task.status === "IN_PROGRESS" && (
                  <div
                    key={task.id}
                    className="card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <div className="card__content">
                      <div className="card__text">
                        <h3>{task.title}</h3>
                        <p>Status: {getStatusText(task.status)}</p>
                        <p>Descrição: {task.description}</p>
                      </div>
                      <Tooltip title="Editar atividade">
                        <IconButton onClick={() => handleEditTask(task.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                )
            )}
          </section>
        </section>

        <section className="column">
          <div className="column__header">
            <h2 className="column__title">CONCLUÍDAS</h2>
            <Tooltip title="Criar atividade">
              <IconButton className="mr-15" onClick={handleCreateTask}>
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          </div>
          <section
            className="column__cards"
            onDrop={(e) => handleDrop(e, "DONE")}
            onDragOver={handleDragOver}
          >
            {tasks.map(
              (task) =>
                task.status === "DONE" && (
                  <div
                    key={task.id}
                    className="card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                  >
                    <div className="card__content">
                      <div className="card__text">
                        <h3>{task.title}</h3>
                        <p>Status: {getStatusText(task.status)}</p>
                        <p>Descrição: {task.description}</p>
                      </div>
                      <Tooltip title="Editar atividade">
                        <IconButton onClick={() => handleEditTask(task.id)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                )
            )}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Home;
