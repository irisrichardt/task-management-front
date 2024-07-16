import React, { useState } from "react";
import { login } from "../../services/authService";
import loginImage from "../../assets/workflow_image.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      window.location.href = "/home";
    } catch (err) {
      setError("Login failed");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex w-1/2">
        <div className="relative w-full h-full">
          <img
            src={loginImage}
            alt="Login"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded shadow-md max-w-lg w-full"
        >
          <h1 className="mb-4 text-2xl font-bold text-center text-customLilas">
            Login
          </h1>
          <p className="mb-4 text-center text-gray-600">
            Realize login para acessar suas informações
          </p>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-purple-300"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded focus:outline-none focus:border-purple-300"
            />
            <div
              className="absolute right-1 flex items-center pr-2 cursor-pointer"
              onClick={toggleShowPassword}
              style={{ top: "20%" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-customLilas2 text-white rounded hover:bg-customLilas"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
