import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import TaskTable from "./TaskTable";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCreateTask = () => {
    navigate("/create-task");
  };

  return (
    <>
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className={`p-8 ${menuOpen ? "ml-64" : ""}`}>
        <button
          onClick={handleCreateTask}
          className="p-2 mb-6 bg-green-500 text-white rounded ml-8"
        >
          Criar nova atividade
        </button>
        <TaskTable />
      </div>
    </>
  );
}

export default Home;
