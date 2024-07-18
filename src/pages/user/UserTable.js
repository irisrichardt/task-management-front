import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

function UserTable() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        const transformedUsers = data.map((user) => ({
          ...user,
          gender: transformGender(user.gender),
        }));
        setUsers(transformedUsers);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    getUsers();
  }, []);

  const transformGender = (gender) => {
    switch (gender) {
      case "male":
        return "Masculino";
      case "female":
        return "Feminino";
      default:
        return "Outro";
    }
  };

  const handleCreateUser = () => {
    navigate("/create-dev");
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="table-container p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="titule">Lista de desenvolvedores</h1>
            <Tooltip title="Novo desenvolvedor">
              <IconButton className="mr-15" onClick={() => handleCreateUser()}>
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead className="table-header bg-[#8393C5] text-white">
              <tr>
                <th className="py-2 text-center">Username</th>
                <th className="py-2 text-center">Nome</th>
                <th className="py-2 text-center">Data nascimento</th>
                <th className="py-2 text-center">Gênero</th>
                <th className="py-2 text-center">Email</th>
                <th className="py-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {users.map((user) => (
                <tr key={user.id} className="border-t table-row text-center">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">
                    {new Date(user.birthDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{user.gender}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 table-actions">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="p-2 mr-2 edit-button rounded bg-yellow-500 text-white"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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

export default UserTable;
