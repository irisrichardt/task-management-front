import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../components/styles.css";
import { fetchDevById } from "../../services/userService";
import { getUser } from "../../services/authService";
import { format } from "date-fns";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      fetchDevById(currentUser.id)
        .then((data) => setUser(data))
        .catch(() => setError("Failed to load user data"));
    } else {
      setError("Nenhum usuário logado");
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

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

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold mb-2 text-left titule">
              Perfil do usuário
            </h1>
            <Tooltip title="Editar informações">
              <IconButton
                className="mr-15"
                onClick={() => handleEditUser(user.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
          <p className="text-lg mb-6 text-left">Informações do usuário</p>
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {user && (
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  {user.username}
                </p>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  {user.name}
                </p>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Data de nascimento
                </label>
                <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  {formatDate(user.birthDate)}
                </p>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Gênero
                </label>
                <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  {transformGender(user.gender)}
                </p>
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                  {user.email}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
