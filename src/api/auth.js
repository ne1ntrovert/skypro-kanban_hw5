import { ENDPOINTS } from './config.js';
import { request } from './http.js';

function normalizeAuthResponse(data) {
  if (!data) return null;
  const user = data.user || data;
  const token = data.token || user.token;
  if (!token) return null;
  return {
    token,
    name: user.name || '',
    login: user.login || user.email || '',
  };
}

export async function registerRequest({ name, login, password }) {
  const data = await request(ENDPOINTS.register, {
    method: 'POST',
    body: { name, login, password },
  });
  return normalizeAuthResponse(data);
}

export async function loginRequest({ login, password }) {
  const data = await request(ENDPOINTS.login, {
    method: 'POST',
    body: { login, password },
  });
  return normalizeAuthResponse(data);
}
