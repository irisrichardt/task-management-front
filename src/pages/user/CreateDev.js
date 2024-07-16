import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createDev, fetchDevById, updateDev } from "../../services/userService";
import Navbar from "../../components/Navbar";
import "../../components/styles.css";

function CreateDev({ isEditMode = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      fetchDevById(id)
        .then((dev) => {
          setUsername(dev.username);
          setPassword(dev.password);
          setName(dev.name);
          setBirthDate(dev.birthDate);
          setGender(dev.gender);
          setEmail(dev.email);
        })
        .catch((err) => {
          setError("Failed to load developer");
        });
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateDev(id, {
          username,
          password,
          name,
          birthDate,
          gender,
          email,
        });
      } else {
        await createDev({ username, password, name, birthDate, gender, email });
      }
      setUsername("");
      setPassword("");
      setName("");
      setBirthDate("");
      setGender("male");
      setEmail("");
      setError("");
      setCreated(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to save developer");
    }
  };

  useEffect(() => {
    if (created) {
      navigate("/users/lista");
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
            Novo desenvolvedor
          </h1>
          <p className="text-lg mb-6 text-left">
            Preencha o formulário para cadastrar um novo desenvolvedor
          </p>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEditMode ? "Editar desenvolvedor" : "Criar novo desenvolvedor"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
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
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Data de nascimento
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Gênero
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isEditMode ? "Atualizar desenvolvedor" : "Salvar"}
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

export default CreateDev;
