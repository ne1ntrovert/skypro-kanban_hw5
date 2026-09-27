import { ENDPOINTS } from './config.js';
import { request } from './http.js';

function normalizeTask(raw) {
  if (!raw) return null;
  return {
    id: raw._id || raw.id,
    title: raw.title || '',
    description: raw.description || '',
    topic: raw.topic || raw.category || 'Web Design',
    status: raw.status || 'Без статуса',
    date: raw.date || '',
  };
}

export async function getTasks(token) {
  const data = await request(ENDPOINTS.tasks, { token });
  const list = data.tasks || data.data || (Array.isArray(data) ? data : []);
  return list.map(normalizeTask);
}

export async function getTask(id, token) {
  const data = await request(ENDPOINTS.task(id), { token });
  return normalizeTask(data.task || data);
}

export async function createTask(taskData, token) {
  const data = await request(ENDPOINTS.tasks, {
    method: 'POST',
    token,
    body: {
      title: taskData.title,
      description: taskData.description,
      topic: taskData.topic,
      status: taskData.status,
      date: taskData.date,
    },
  });
  return normalizeTask(data.newCard || data.task || data);
}

export async function updateTask(id, taskData, token) {
  const data = await request(ENDPOINTS.task(id), {
    method: 'PUT',
    token,
    body: {
      title: taskData.title,
      description: taskData.description,
      topic: taskData.topic,
      status: taskData.status,
      date: taskData.date,
    },
  });
  return normalizeTask(data.updatedCard || data.task || data);
}

export async function deleteTask(id, token) {
  await request(ENDPOINTS.task(id), { method: 'DELETE', token });
  return id;
}
