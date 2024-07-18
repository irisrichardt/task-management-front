// src/services/userService.js
import { getToken } from "./authService";

const API_URL = "http://localhost:3001";

export async function createDev({
  username,
  password,
  name,
  birthDate,
  gender,
  email,
}) {
  const token = getToken();
  if (!password) {
    throw new Error("Password is required");
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        password,
        name,
        birthDate,
        gender,
        email,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create developer");
    }

    return await response.json();
  } catch (error) {
    console.error("Error while creating user:", error);
    throw new Error("Error while creating user");
  }
}

export async function updateDev(id, username, name, birthDate, gender, email) {
  const token = getToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      username,
      name,
      birthDate,
      gender,
      email,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }

  return await response.json();
}

export async function fetchDevById(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return await response.json();
}

export async function fetchUsers() {
  const token = getToken();

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch users");
  }
}

export async function deleteUser(userId) {
  const token = getToken();

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
}
