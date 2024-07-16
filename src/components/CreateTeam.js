import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTeam, fetchTeamById, updateTeam } from "../services/teamService";
import Navbar from "./Navbar";
import "./styles.css";

function CreateTeam({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      fetchTeamById(id)
        .then((team) => {
          setName(team.name);
        })
        .catch((err) => {
          setError("Failed to load team");
        });
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateTeam(id, name);
      } else {
        await createTeam(name);
      }
      setName("");
      setError("");
      setCreated(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save team");
    }
  };

  useEffect(() => {
    if (created) {
      navigate("/equipe/lista");
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
          <h1 className="text-3xl font-bold mb-2 text-left">Nova equipe</h1>
          <p className="text-lg mb-6 text-left">
            Preencha o formulário para cadastrar uma nova equipe
          </p>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEditMode ? "Editar equipe" : "Criar nova equipe"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isEditMode ? "Atualizar equipe" : "Salvar"}
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

export default CreateTeam;
