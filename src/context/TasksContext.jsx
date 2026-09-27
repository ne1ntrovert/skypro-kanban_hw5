import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.jsx';
import { createTask, deleteTask, getTasks, updateTask } from '../api/tasks.js';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const { token, isAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    if (!isAuth) return;
    setLoading(true);
    setError('');
    try {
      const list = await getTasks(token);
      setTasks(list);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [isAuth, token]);

  useEffect(() => {
    if (isAuth) {
      refresh();
    } else {
      setTasks([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  async function addTask(taskData) {
    const created = await createTask(taskData, token);
    setTasks((prev) => [...prev, created]);
    return created;
  }

  async function editTask(id, taskData) {
    const updated = await updateTask(id, taskData, token);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }

  async function removeTask(id) {
    await deleteTask(id, token);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function getTaskById(id) {
    return tasks.find((t) => String(t.id) === String(id)) || null;
  }

  const value = { tasks, loading, error, refresh, addTask, editTask, removeTask, getTaskById };
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  return useContext(TasksContext);
}
