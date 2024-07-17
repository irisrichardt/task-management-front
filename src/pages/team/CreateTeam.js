import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  createTeam,
  fetchTeamById,
  updateTeam,
  removeMemberFromTeam,
} from "../../services/teamService";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/PersonAdd";

function CreateTeam({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (isEditMode && id) {
      fetchTeamById(id)
        .then((team) => {
          setName(team.name);
          setTeamMembers(team.members || []);
        })
        .catch((err) => {
          setError("Falha ao carregar equipe");
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
      console.error("Erro:", err);
      setError("Falha ao salvar equipe");
    }
  };

  useEffect(() => {
    if (created) {
      navigate("/equipe/lista");
    }
  }, [created, navigate]);

  const handleCancel = () => {
    navigate("/equipe/lista");
  };

  const handleAddMembers = () => {
    navigate("/assign-dev-to-team");
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await removeMemberFromTeam(id, memberId);
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== memberId)
      );
    } catch (err) {
      console.error("Erro ao remover membro da equipe:", err);
      setError("Falha ao remover membro da equipe");
    }
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2 text-left">
            {isEditMode ? "Editar equipe" : "Nova equipe"}
          </h1>
          <p className="text-lg mb-6 text-left">
            Preencha o formulário para {isEditMode ? "editar" : "criar"} uma{" "}
            {isEditMode ? "equipe existente" : "nova equipe"}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Nome:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {teamMembers.length > 0 && (
              <div className="form-group">
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-gray-700 mt-4 items-center">
                    Membros da equipe:
                  </label>
                  <Tooltip title="Criar atividade">
                    <IconButton onClick={handleAddMembers}>
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="border-2 border-gray-200 rounded-md p-2">
                  <ul className="divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <li
                        key={member.id}
                        className="py-2 flex items-center justify-between"
                      >
                        <span>{member.username}</span>
                        <Tooltip title="Remover usuário" placement="top">
                          <IconButton
                            size="small"
                            aria-label="delete"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Tooltip>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
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
