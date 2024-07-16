import { getToken } from "./authService";

const API_URL = "http://localhost:3001";

export async function createTeam(name) {
  const token = getToken();
  const response = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Failed to create team");
  }

  return await response.json();
}

export async function updateTeam(id, name) {
  const token = getToken();
  const response = await fetch(`${API_URL}/teams/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update team");
  }

  return await response.json();
}

export async function fetchTeamById(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/teams/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch team");
  }

  return await response.json();
}

export async function fetchTeams() {
  const token = getToken();

  const response = await fetch(`${API_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch teams");
  }
}

export async function deleteTeam(teamId) {
  const token = getToken();

  const response = await fetch(`${API_URL}/teams/${teamId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete team");
  }
}
