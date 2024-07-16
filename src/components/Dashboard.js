import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";

function Dashboard({ activities, onDragEnd }) {
  const navigate = useNavigate();

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const newIndex = parseInt(e.dataTransfer.getData("index"));
    onDragEnd(e, newIndex, status);
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  return (
    <div className="table-container p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-4">Atividades</h2>
      <div className="flex">
        <div
          className="w-1/3 p-4 border mr-4 relative"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "TO_DO")}
        >
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>Pendentes</span>
          </h2>
          {activities
            .filter((task) => task.status === "TO_DO")
            .map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                className="bg-gray-200 p-2 mb-2 rounded flex items-center justify-between"
              >
                <span>{task.title}</span>
                <Tooltip title="Editar atividade">
                  <IconButton
                    aria-label={`editar-pendentes-${index}`}
                    onClick={() => handleEdit(task.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
        </div>
        {/* Repita o mesmo padrão para as outras duas colunas */}
        <div
          className="w-1/3 p-4 border mr-4 relative"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "IN_PROGRESS")}
        >
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>Em andamento</span>
          </h2>
          {activities
            .filter((task) => task.status === "IN_PROGRESS")
            .map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                className="bg-gray-200 p-2 mb-2 rounded flex items-center justify-between"
              >
                <span>{task.title}</span>
                <Tooltip title="Editar atividade">
                  <IconButton
                    aria-label={`editar-andamento-${index}`}
                    onClick={() => handleEdit(task.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
        </div>
        <div
          className="w-1/3 p-4 border relative"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "DONE")}
        >
          <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
            <span>Concluídas</span>
          </h2>
          {activities
            .filter((task) => task.status === "DONE")
            .map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                className="bg-gray-200 p-2 mb-2 rounded flex items-center justify-between"
              >
                <span>{task.title}</span>
                <Tooltip title="Editar atividade">
                  <IconButton
                    aria-label={`editar-concluidas-${index}`}
                    onClick={() => handleEdit(task.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
