const API_URL = "http://localhost:3001";

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } else {
    throw new Error("Login failed");
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}

export function getToken() {
  return localStorage.getItem("token");
}
