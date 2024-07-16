import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, fetchTaskById, updateTask } from "../services/authService";
import Navbar from "./Navbar";
import "./styles.css";

function CreateTask({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TO_DO");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      fetchTaskById(id)
        .then((task) => {
          setTitle(task.title);
          setDescription(task.description);
          setStatus(task.status);
        })
        .catch((err) => {
          setError("Failed to load task");
        });
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expirationDate = new Date().toISOString().split("T")[0];
    try {
      if (isEditMode) {
        await updateTask(id, title, description, status, expirationDate);
      } else {
        await createTask(title, description, status, expirationDate);
      }
      setTitle("");
      setDescription("");
      setStatus("TO_DO");
      setError("");
      setCreated(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save task");
    }
  };

  useEffect(() => {
    if (created) {
      navigate("/home");
    }
  }, [created, navigate]);

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2 text-left">
            {isEditMode ? "Editar atividade" : "Criar nova atividade"}
          </h1>
          <p className="text-lg mb-6 text-left">Preencha o formulário abaixo</p>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEditMode ? "Editar atividade" : "Criar nova atividade"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="TO_DO">Pendente</option>
                <option value="IN_PROGRESS">Em andamento</option>
                <option value="DONE">Concluído</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isEditMode ? "Atualizar atividade" : "Salvar"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default CreateTask;
