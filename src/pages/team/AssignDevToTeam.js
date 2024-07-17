import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeams, assignDevToTeam } from "../../services/teamService";
import { fetchUsers } from "../../services/userService";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const TeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleEditTeam = (teamId) => {
    navigate(`/edit-teams/${teamId}`);
  };

  const totalMembers = team.members.length;

  return (
    <div className="bg-gray-100 rounded-md p-4 mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{team.name}</h2>
        <p>Membros: {totalMembers}</p>
      </div>
      <div>
        <Tooltip title="Editar equipe">
          <IconButton onClick={() => handleEditTeam(team.id)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

function AssignDevToTeam({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedDevs, setSelectedDevs] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        setTeams(data);
      })
      .catch((error) => setError("Falha ao carregar equipes"));

    fetchUsers()
      .then((data) => setUsuarios(data))
      .catch((error) => setError("Falha ao carregar desenvolvedores"));
  }, [isEditMode, id]);

  const handleAssignDevs = async () => {
    try {
      for (const devId of selectedDevs) {
        await assignDevToTeam(selectedTeam, devId);
        const assignedDev = usuarios.find((dev) => dev.id === devId);
        setTeamMembers([...teamMembers, assignedDev]);
      }
      setSelectedDevs([]);
      const updatedTeams = await fetchTeams();
      setTeams(updatedTeams);
    } catch (err) {
      console.error("Erro:", err);
      setError("Falha ao atribuir desenvolvedor à equipe");
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const toggleSelectAll = () => {
    const allDevIds = usuarios.map((dev) => dev.id);
    setSelectedDevs(selectedDevs.length === allDevIds.length ? [] : allDevIds);
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div>
            <h1 className="titule text-center">Gerenciar equipes</h1>
            <div className="mt-8 mb-4">
              <label className="block mb-1">Equipe:</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Selecione uma equipe</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="block mb-1">Desenvolvedores:</label>
            <div className="mb-4 border-2 border-gray-200 rounded-md p-4">
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDevs.length === usuarios.length}
                    onChange={toggleSelectAll}
                    className="mr-2"
                  />
                  Selecionar todos
                </label>
                {usuarios.map((dev) => (
                  <label key={dev.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedDevs.includes(dev.id)}
                      onChange={() => {
                        if (selectedDevs.includes(dev.id)) {
                          setSelectedDevs(
                            selectedDevs.filter((id) => id !== dev.id)
                          );
                        } else {
                          setSelectedDevs([...selectedDevs, dev.id]);
                        }
                      }}
                      className="mr-2"
                    />
                    {dev.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleAssignDevs}
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Atribuir desenvolvedor(es)
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AssignDevToTeam;
