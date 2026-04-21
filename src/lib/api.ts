const API_BASE = '/api';

const apiFetch = async (endpoint: string, options: any = {}) => {
  const token = localStorage.getItem('token');

  const isFormData = options.body instanceof FormData;

  const config: any = {
    method: options.method || 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      // IMPORTANT: do NOT set JSON header for FormData
      ...(!isFormData && { 'Content-Type': 'application/json' }),
    },
    body: options.body,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  const text = await response.text();

  // ERROR HANDLING
  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(text);
    } catch {
      error = { error: text || 'API error' };
    }
    throw new Error(error.error || 'API error');
  }

  // EMPTY RESPONSE HANDLING
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

// ================= AUTH =================
export const authAPI = {
  login: (credentials: any) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// ================= BLOGS =================
export const blogsAPI = {
  getAll: () => apiFetch('/admin/blogs'),
  getById: (id: string) => apiFetch(`/admin/blogs/${id}`),

  create: (data: any) =>
    apiFetch('/admin/blogs', {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/admin/blogs/${id}`, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/blogs/${id}`, { method: 'DELETE' }),

  getAllPublic: () => apiFetch('/blogs'),
};

// ================= SERVICES =================
export const servicesAPI = {
  getAll: () => apiFetch('/admin/services'),
  getAllPublic: () => apiFetch('/services'),

  create: (data: any) =>
    apiFetch('/admin/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/services/${id}`, { method: 'DELETE' }),
};

// ================= TEAM =================
export const teamAPI = {
  getAll: () => apiFetch('/admin/team'),
  getAllPublic: () => apiFetch('/team'),

  create: (data: any) =>
    apiFetch('/admin/team', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/admin/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/team/${id}`, { method: 'DELETE' }),
};

// ================= TESTIMONIALS =================
export const testimonialsAPI = {
  getAll: () => apiFetch('/admin/testimonials'),
  getAllPublic: () => apiFetch('/testimonials'),

  create: (data: any) =>
    apiFetch('/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/testimonials/${id}`, { method: 'DELETE' }),
};

// ================= UNIVERSITIES =================
export const universitiesAPI = {
  getAll: () => apiFetch('/admin/universities'),
  getAllPublic: () => apiFetch('/universities'),

  create: (data: any) =>
    apiFetch('/admin/universities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: any) =>
    apiFetch(`/admin/universities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/universities/${id}`, { method: 'DELETE' }),
};

// ================= INQUIRIES =================
export const inquiriesAPI = {
  getAll: () => apiFetch('/admin/inquiries'),

  delete: (id: string) =>
    apiFetch(`/admin/inquiries/${id}`, { method: 'DELETE' }),

  create: (data: any) =>
    apiFetch('/inquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default apiFetch;