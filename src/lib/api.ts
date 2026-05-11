// Production API base - in production, we need the explicit backend URL
// For Render: the backend is typically at the same host or a separate render service
const getApiBase = () => {
  // If explicitly set, use it
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // In production (non-development), try to construct from current origin
  if (import.meta.env.PROD === 'true' || !import.meta.env.DEV) {
    // If VITE_API_BASE_URL is NOT set, fall back to same-origin (will work only when frontend & backend share host)
    return '/api';
  }
  // Development: use proxy or local
  return '/api';
};

const API_BASE = getApiBase();

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: FormData | string;
};

const apiFetch = async (endpoint: string, options: ApiRequestOptions = {}) => {
  const token = localStorage.getItem('token');

  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    body: options.body as BodyInit | undefined,
  };


  const response = await fetch(`${API_BASE}${endpoint}`, config);

  const text = await response.text();

  if (!response.ok) {
    let error;
    try {
      error = JSON.parse(text);
    } catch {
      error = { error: text || 'API error' };
    }
    throw new Error(error.error || 'API error');
  }

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

// AUTH
type AnyRecord = Record<string, unknown>;



// AUTH
export const authAPI = {
  login: (credentials: AnyRecord) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};


// BLOGS
export const blogsAPI = {
  getAll: () => apiFetch('/admin/blogs'),
  getById: (id: string) => apiFetch(`/admin/blogs/${id}`),
  create: (data: unknown) => apiFetch('/admin/blogs', {
    method: 'POST',
    body: data instanceof FormData ? data : JSON.stringify(data),
  }),
  update: (id: string, data: unknown) => apiFetch(`/admin/blogs/${id}`, {
    method: 'PUT',
    body: data instanceof FormData ? data : JSON.stringify(data),
  }),
  delete: (id: string) => apiFetch(`/admin/blogs/${id}`, { method: 'DELETE' }),
  getAllPublic: () => apiFetch('/blogs'),
  getBySlug: (slug: string) => apiFetch(`/blogs/${slug}`),
};

// TEAM
export const teamAPI = {
  getAll: () => apiFetch('/admin/team'),
  getAllPublic: () => apiFetch('/team'),
  create: (data: FormData) => apiFetch('/admin/team', { method: 'POST', body: data }),
  update: (id: string, data: FormData) => apiFetch(`/admin/team/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiFetch(`/admin/team/${id}`, { method: 'DELETE' }),
};

// TESTIMONIALS
export const testimonialsAPI = {
  getAll: () => apiFetch('/admin/testimonials'),
  getAllPublic: () => apiFetch('/testimonials'),
  create: (data: unknown) => apiFetch('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: unknown) => apiFetch(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiFetch(`/admin/testimonials/${id}`, { method: 'DELETE' }),
};

// UNIVERSITIES
export const universitiesAPI = {
  getAll: () => apiFetch('/admin/universities'),
  getAllPublic: () => apiFetch('/universities'),
  create: (data: FormData) => apiFetch('/admin/universities', { method: 'POST', body: data }),
  update: (id: string, data: FormData) => apiFetch(`/admin/universities/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => apiFetch(`/admin/universities/${id}`, { method: 'DELETE' }),
};

// SETTINGS
export const settingsAPI = {
  getPublic: () => apiFetch('/settings'),
  getAdmin: () => apiFetch('/admin/settings'),
  updateAdmin: (data: Record<string, unknown>) =>
    apiFetch('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// INQUIRIES
export const inquiriesAPI = {
  getAll: () => apiFetch('/admin/inquiries'),
  getContact: () => apiFetch('/admin/inquiries?type=contact'),
  getAppointments: () => apiFetch('/admin/inquiries?type=appointment'),
  delete: (id: string) => apiFetch(`/admin/inquiries/${id}`, { method: 'DELETE' }),
  create: (data: unknown) => apiFetch('/inquiries', { method: 'POST', body: JSON.stringify(data) }),
};

// SERVICES - NEW
export const servicesAPI = {

  getAll: () => apiFetch('/admin/services'),
  getAllPublic: () => apiFetch('/services'),
  create: (data: unknown) => apiFetch('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: unknown) => apiFetch(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiFetch(`/admin/services/${id}`, { method: 'DELETE' }),
};

const resolveImageUrl = (imagePath?: string | null): string => {
  if (!imagePath) return '';
  if (typeof imagePath !== 'string') return '';

  // already absolute (http/https/data)
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }

  // support relative paths like "/uploads/..." or "uploads/..."
  const normalized = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

  const baseFromEnv = import.meta.env.VITE_API_BASE_URL;
  if (baseFromEnv && typeof baseFromEnv === 'string' && baseFromEnv.trim()) {
    const base = baseFromEnv.replace(/\/$/, '');
    return `${base}${normalized}`;
  }

  // Fallback: use current origin (works if frontend + backend share a host)
  // Use an absolute URL so <img> always gets a resolvable URL.
  return `${window.location.origin}${normalized}`;
};


export { resolveImageUrl };
export default apiFetch;


