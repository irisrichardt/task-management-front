import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles.css";

function UserTable() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="table-container p-6">
          <h1 className="titule mb-4">Lista de desenvolvedores</h1>
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
                      onClick={() => handleEdit(user.id)}
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
