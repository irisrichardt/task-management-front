import { getToken } from "./authService";

const API_URL = "http://localhost:3001";

export async function fetchTasks() {
  const token = getToken();
  const response = await fetch(`${API_URL}/task`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch tasks");
  }
}

export async function fetchTaskById(id) {
  const token = getToken();
  const response = await fetch(`${API_URL}/task/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return await response.json();
}

export async function deleteTask(taskId) {
  const token = getToken();
  const response = await fetch(`${API_URL}/task/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

export async function createTask(title, description, status, expirationDate) {
  const token = getToken();
  const response = await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status, expirationDate }),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
}

export async function updateTask(
  id,
  title,
  description,
  status,
  expirationDate
) {
  const token = getToken();
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status, expirationDate }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update task");
  }

  return await response.json();
}
