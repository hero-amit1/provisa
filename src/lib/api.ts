const API_BASE = '/api';

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  if (!response.ok) {
    const text = await response.text();
    let error;
    try {
      error = JSON.parse(text);
    } catch {
      error = { error: text || 'API error' };
    }
    throw new Error(error.error || 'API error');
  }
  const text = await response.text();
  if (text === '') throw new Error('Empty response');
  const data = JSON.parse(text);
  return data;
};

export const authAPI = {
  login: (credentials) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
};

export const blogsAPI = {
  getAll: () => apiFetch('/admin/blogs'),
  getById: (id) => apiFetch(`/admin/blogs/${id}`),
  create: (data) => apiFetch('/admin/blogs', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/admin/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/admin/blogs/${id}`, { method: 'DELETE' }),
  getAllPublic: () => apiFetch('/blogs'),
};

export const servicesAPI = {
  getAll: () => apiFetch('/admin/services'),
  getAllPublic: () => apiFetch('/services'),
  create: (data) => apiFetch('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/admin/services/${id}`, { method: 'DELETE' }),
};

export const teamAPI = {
  getAll: () => apiFetch('/admin/team'),
  getAllPublic: () => apiFetch('/team'),
  create: (data) => apiFetch('/admin/team', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/admin/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/admin/team/${id}`, { method: 'DELETE' }),
};

export const testimonialsAPI = {
  getAll: () => apiFetch('/admin/testimonials'),
  getAllPublic: () => apiFetch('/testimonials'),
  create: (data) => apiFetch('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/admin/testimonials/${id}`, { method: 'DELETE' }),
};

export const universitiesAPI = {
  getAll: () => apiFetch('/admin/universities'),
  getAllPublic: () => apiFetch('/universities'),
  create: (data) => apiFetch('/admin/universities', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiFetch(`/admin/universities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiFetch(`/admin/universities/${id}`, { method: 'DELETE' }),
};

export const inquiriesAPI = {
  getAll: () => apiFetch('/admin/inquiries'),
  delete: (id) => apiFetch(`/admin/inquiries/${id}`, { method: 'DELETE' }),
  create: (data) => apiFetch('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
};

export default apiFetch;
