import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PopBrowse from '../components/popups/PopBrowse.jsx';
import { useTasks } from '../context/TasksContext.jsx';

export default function EditTaskPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getTaskById, editTask, removeTask, loading } = useTasks();
  const task = getTaskById(id);

  if (!task && loading) {
    return <p style={{ padding: 20 }}>Загрузка задачи…</p>;
  }

  return (
    <PopBrowse
      task={task}
      mode="edit"
      onClose={() => navigate(`/card/${id}`)}
      onSave={async (data) => {
        await editTask(id, data);
        navigate(`/card/${id}`);
      }}
      onCancel={() => navigate(`/card/${id}`)}
      onDelete={async () => {
        await removeTask(id);
        navigate(-1);
      }}
    />
  );
}
