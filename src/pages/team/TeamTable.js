import React, { useState, useEffect } from "react";
import { deleteTeam, fetchTeams } from "../../services/teamService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";
import { IconButton, Tooltip } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

function TeamTable() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    getTeams();
  }, []);

  const handleDelete = async (teamId) => {
    try {
      await deleteTeam(teamId);
      setTeams(teams.filter((team) => team.id !== teamId));
    } catch (err) {
      setError("Failed to delete team");
    }
  };

  const handleCreateTeam = () => {
    navigate("/create-team");
  };

  const handleEdit = (teamId) => {
    navigate(`/edit-teams/${teamId}`);
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="table-container p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="titule mb-4">Lista de equipes</h1>
            <Tooltip title="Criar equipe">
              <IconButton className="mr-15" onClick={handleCreateTeam}>
                <GroupAddIcon />
              </IconButton>
            </Tooltip>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead className="table-header bg-[#8393C5] text-white">
              <tr>
                <th className="py-2 text-center">Nome</th>
                <th className="py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {teams.map((team) => (
                <tr key={teams.id} className="border-t table-row text-center">
                  <td className="py-2 px-4">{team.name}</td>
                  <td className="py-2 px-4 table-actions">
                    <button
                      onClick={() => handleEdit(team.id)}
                      className="p-2 mr-2 edit-button rounded bg-yellow-500 text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(team.id)}
                      className="p-2 delete-button rounded bg-red-500 text-white"
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

export default TeamTable;
