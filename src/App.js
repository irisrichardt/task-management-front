import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateTask from "./components/CreateTask";
import CreateDev from "./components/CreateDev";
import CreateTeam from "./components/CreateTeam";
import { getToken } from "./services/authService";
import UserTable from "./components/UserTable";

function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = getToken();
    return (
      <Route
        {...rest}
        element={
          isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />
        }
      />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={getToken() ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-task"
          element={getToken() ? <CreateTask /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-task/:id"
          element={
            getToken() ? (
              <CreateTask isEditMode={true} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/create-dev"
          element={getToken() ? <CreateDev /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-team"
          element={getToken() ? <CreateTeam /> : <Navigate to="/login" />}
        />
        <Route
          path="/users/lista"
          element={getToken() ? <UserTable /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
