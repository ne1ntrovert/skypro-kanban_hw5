import React from 'react';
import { useNavigate } from 'react-router-dom';
import PopNewCard from '../components/popups/PopNewCard.jsx';
import { useTasks } from '../context/TasksContext.jsx';

export default function NewTaskPage() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  async function handleCreate(taskData) {
    await addTask(taskData);
    navigate(-1);
  }

  return <PopNewCard onClose={() => navigate(-1)} onCreate={handleCreate} />;
}
