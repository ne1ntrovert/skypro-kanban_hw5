export const BASE_URL = 'https://wedev-api.sky.pro/api';

export const ENDPOINTS = {
  register: `${BASE_URL}/user`,
  login: `${BASE_URL}/user/login`,
  tasks: `${BASE_URL}/kanban`,
  task: (id) => `${BASE_URL}/kanban/${id}`,
};
