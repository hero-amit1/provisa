
const getApiBase = () => {
  // Explicit backend URL from env
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  }

  // Development -> use Vite proxy
  if (import.meta.env.DEV) {
    return '/api';
  }

  // Production fallback -> same origin
  return `${window.location.origin}/api`;
};

const API_BASE = getApiBase();

// =========================
// TYPES
// =========================

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: FormData | string;
};

type AnyRecord = Record<string, unknown>;

// =========================
// API FETCH
// =========================

const apiFetch = async (
  endpoint: string,
  options: ApiRequestOptions = {}
) => {
  const token = localStorage.getItem('token');

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {};

  const logBodyForDebug = (body: ApiRequestOptions['body']) => {
    if (!body) return undefined;
    if (body instanceof FormData) {
      try {
        return Array.from(body.entries()).reduce(
          (acc: Record<string, unknown>, [k, v]) => {
            // If multiple fields share the same key (e.g., multiple files), keep the array.
            const existing = acc[k];
            if (existing === undefined) {
              acc[k] = v;
            } else if (Array.isArray(existing)) {
              acc[k] = [...existing, v];
            } else {
              acc[k] = [existing, v];
            }
            return acc;
          },
          {}
        );
      } catch {
        return '[FormData: unable to enumerate entries]';
      }
    }

    return body;
  };

  // Auth token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // JSON content type
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  const url = `${API_BASE}${endpoint}`;

  // Debug logs (development only)
  if (import.meta.env.DEV) {
    console.log('========================');
    console.log('API REQUEST');
    console.log('URL:', url);
    console.log('METHOD:', options.method || 'GET');
    console.log('BODY:', logBodyForDebug(options.body));
    console.log('========================');
  }


  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body as BodyInit | undefined,
  });

  const text = await response.text();

  let parsed: unknown = null;

  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }

  // Handle errors
  if (!response.ok) {
    const messageFromJson =
      parsed &&
        typeof parsed === 'object' &&
        parsed !== null
        ? (parsed as { message?: unknown }).message
        : undefined;

    const errorFromJson =
      parsed &&
        typeof parsed === 'object' &&
        parsed !== null
        ? (parsed as { error?: unknown }).error
        : undefined;

    const finalMessage =
      typeof messageFromJson === 'string'
        ? messageFromJson
        : typeof errorFromJson === 'string'
          ? errorFromJson
          : parsed
            ? JSON.stringify(parsed)
            : text
              ? text
              : 'API error';

    // Improve frontend debugging: log parsed error details too
    console.error('API ERROR TEXT (raw):', text);
    if (parsed && typeof parsed === 'object') {
      console.error('API ERROR DETAILS (parsed):', parsed);
    }

    console.error('========================');
    console.error('API ERROR');
    console.error('URL:', url);
    console.error('STATUS:', response.status);
    console.error('RESPONSE (parsed||text):', parsed || text);
    console.error('========================');

    throw new Error(`${response.status} ${finalMessage}`);
  }

  // Empty response
  if (!text) return null;

  // Return parsed JSON if possible
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

// =========================
// AUTH
// =========================

export const authAPI = {
  login: (credentials: AnyRecord) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

// =========================
// BLOGS
// =========================

export const blogsAPI = {
  getAll: () => apiFetch('/admin/blogs'),

  getById: (id: string) =>
    apiFetch(`/admin/blogs/${id}`),

  create: (data: unknown) =>
    apiFetch('/admin/blogs', {
      method: 'POST',
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  update: (id: string, data: unknown) =>
    apiFetch(`/admin/blogs/${id}`, {
      method: 'PUT',
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/blogs/${id}`, {
      method: 'DELETE',
    }),

  getAllPublic: () => apiFetch('/blogs'),

  getBySlug: (slug: string) =>
    apiFetch(`/blogs/${slug}`),
};

// =========================
// TEAM
// =========================

export const teamAPI = {
  getAll: () => apiFetch('/admin/team'),

  getAllPublic: () => apiFetch('/team'),

  create: (data: FormData) =>
    apiFetch('/admin/team', {
      method: 'POST',
      body: data,
    }),

  update: (id: string, data: FormData) =>
    apiFetch(`/admin/team/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: string) =>
    apiFetch(`/admin/team/${id}`, {
      method: 'DELETE',
    }),
};

// =========================
// TESTIMONIALS
// =========================

export const testimonialsAPI = {
  getAll: () => apiFetch('/admin/testimonials'),

  getAllPublic: () => apiFetch('/testimonials'),

  create: (data: unknown) =>
    apiFetch('/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: unknown) =>
    apiFetch(`/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/testimonials/${id}`, {
      method: 'DELETE',
    }),
};

// =========================
// UNIVERSITIES
// =========================

export const universitiesAPI = {
  getAll: () =>
    apiFetch('/admin/universities'),

  getAllPublic: () =>
    apiFetch('/universities'),

  create: (data: FormData) =>
    apiFetch('/admin/universities', {
      method: 'POST',
      body: data,
    }),

  update: (id: string, data: FormData) =>
    apiFetch(`/admin/universities/${id}`, {
      method: 'PUT',
      body: data,
    }),

  delete: (id: string) =>
    apiFetch(`/admin/universities/${id}`, {
      method: 'DELETE',
    }),
};

// =========================
// SETTINGS
// =========================
// =========================
// SETTINGS
// =========================

export const settingsAPI = {
  // PUBLIC SETTINGS
  getPublic: () =>
    apiFetch('/admin/settings'),

  // ADMIN SETTINGS
  getAdmin: () =>
    apiFetch('/admin/settings'),

  updateAdmin: (data: Record<string, unknown>) =>
    apiFetch('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// =========================
// INQUIRIES
// =========================

export const inquiriesAPI = {
  getAll: () =>
    Promise.reject(
      new Error('Inquiries API removed')
    ),

  getContact: () =>
    Promise.reject(
      new Error('Inquiries API removed')
    ),

  getAppointments: () =>
    Promise.reject(
      new Error('Inquiries API removed')
    ),

  delete: () =>
    Promise.reject(
      new Error('Inquiries API removed')
    ),

  create: () =>
    Promise.reject(
      new Error('Inquiries API removed')
    ),
};

// =========================
// SERVICES
// =========================

export const servicesAPI = {
  getAll: () => apiFetch('/admin/services'),

  getAllPublic: () =>
    apiFetch('/services'),

  create: (data: unknown) =>
    apiFetch('/admin/services', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: unknown) =>
    apiFetch(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch(`/admin/services/${id}`, {
      method: 'DELETE',
    }),
};

// =========================
// IMAGE URL RESOLVER
// =========================

const resolveImageUrl = (
  imagePath?: string | null
): string => {
  if (!imagePath) return '';

  if (typeof imagePath !== 'string') {
    return '';
  }

  // Already full URL
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:')
  ) {
    return imagePath;
  }

  const normalized = imagePath.startsWith('/')
    ? imagePath
    : `/${imagePath}`;

  // Use backend URL if available
  const baseFromEnv =
    import.meta.env.VITE_API_BASE_URL;

  if (
    baseFromEnv &&
    typeof baseFromEnv === 'string'
  ) {
    return `${baseFromEnv.replace(
      /\/$/,
      ''
    )}${normalized}`;
  }

  // Same-origin fallback
  return `${window.location.origin}${normalized}`;
};

export { resolveImageUrl };

export default apiFetch;