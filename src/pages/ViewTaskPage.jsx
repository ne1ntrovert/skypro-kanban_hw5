import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopBrowse from '../components/popups/PopBrowse.jsx';
import { useTasks } from '../context/TasksContext.jsx';

export default function ViewTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTaskById, removeTask, loading } = useTasks();
  const task = getTaskById(id);

  if (!task && loading) {
    return <p style={{ padding: 20 }}>Загрузка задачи…</p>;
  }

  return (
    <PopBrowse
      task={task}
      mode="view"
      onClose={() => navigate(-1)}
      onEdit={() => navigate(`/card/${id}/edit`)}
      onDelete={async () => {
        await removeTask(id);
        navigate(-1);
      }}
    />
  );
}
