import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { getTaskById } from "../services/authService";

function EditTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await getTaskById(id);
        setTask(taskData);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!task) {
    return <p>Task not found</p>;
  }

  return <TaskForm task={task} isEditMode={true} />;
}

export default EditTask;
