import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

function Navbar({ setMenuOpen, menuOpen }) {
  const navigate = useNavigate();
  const [atividadesOpen, setAtividadesOpen] = useState(false);
  const [equipeOpen, setEquipeOpen] = useState(false);
  const [relatoriosOpen, setRelatoriosOpen] = useState(false);
  const [configuracoesOpen, setConfiguracoesOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-customLilas p-4 flex justify-between items-center h-16 w-full">
        <div className="flex items-center">
          <button
            className="text-white mr-4 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
          <div className="text-white text-lg font-semibold">
            <Link to="/home">WorkFlow</Link>
          </div>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div
        className={`bg-customLilas2 w-64 h-[125%] absolute top-16 left-0 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="pb-4 border-b border-white">
            <Link
              to="/home"
              className="text-white block py-2 px-4 hover:bg-customLilas"
            >
              Dashboard
            </Link>
          </div>

          <div className="mt-4 pb-4 border-b border-white">
            <div className="flex items-center justify-between">
              <span className="text-white">Atividades</span>
              <button
                className="text-white focus:outline-none"
                onClick={() => setAtividadesOpen(!atividadesOpen)}
              >
                {atividadesOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.707 12.707a1 1 0 001.414 0L10 11.414l.879.879a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414 1 1 0 001.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {atividadesOpen && (
              <ul className="ml-4">
                <li>
                  <Link
                    to="/create-task"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Nova atividade
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tasks/lista"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Lista de atividades
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <div className="mt-4 pb-4 border-b border-white">
            <div className="flex items-center justify-between">
              <span className="text-white">Equipe</span>
              <button
                className="text-white focus:outline-none"
                onClick={() => setEquipeOpen(!equipeOpen)}
              >
                {equipeOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.707 12.707a1 1 0 001.414 0L10 11.414l.879.879a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414 1 1 0 001.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {equipeOpen && (
              <ul className="ml-4">
                <li>
                  <Link
                    to="/create-dev"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Novo dev
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-team"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Nova equipe
                  </Link>
                </li>
                <li>
                  <Link
                    to="/users/lista"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Lista de devs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/equipe/lista"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Lista de equipes
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <div className="mt-4 pb-4 border-b border-white">
            <div className="flex items-center justify-between">
              <span className="text-white">Relatórios</span>
              <button
                className="text-white focus:outline-none"
                onClick={() => setRelatoriosOpen(!relatoriosOpen)}
              >
                {relatoriosOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.707 12.707a1 1 0 001.414 0L10 11.414l.879.879a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414 1 1 0 001.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {relatoriosOpen && (
              <ul className="ml-4">
                <li>
                  <Link
                    to="/relatorios/mensal"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Relatório Mensal
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <div className="mt-4 pb-4 border-b border-white">
            <div className="flex items-center justify-between">
              <span className="text-white">Configurações</span>
              <button
                className="text-white focus:outline-none"
                onClick={() => setConfiguracoesOpen(!configuracoesOpen)}
              >
                {configuracoesOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.707 12.707a1 1 0 001.414 0L10 11.414l.879.879a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414 1 1 0 001.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {configuracoesOpen && (
              <ul className="ml-4">
                <li>
                  <Link
                    to="/configuracoes/perfil"
                    className="text-white block py-2 px-4 hover:bg-customLilas"
                  >
                    Perfil
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
