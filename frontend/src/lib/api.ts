// API Base URL
const getApiBase = () => {
  // Use environment variable if provided
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Development fallback
  if (import.meta.env.DEV) {
    return 'http://localhost:4000/api';
  }

  // Production fallback
  return '/api';
};

const API_BASE = getApiBase();

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: FormData | string;
};

const apiFetch = async (
  endpoint: string,
  options: ApiRequestOptions = {}
) => {
  const token = localStorage.getItem('token');

  const isFormData = options.body instanceof FormData;

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...(token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...(!isFormData
        ? { 'Content-Type': 'application/json' }
        : {}),
    },
    body: options.body as BodyInit | undefined,
  };

  const response = await fetch(
    `${API_BASE}${endpoint}`,
    config
  );

  const text = await response.text();

  if (!response.ok) {
    let parsed: unknown = null;

    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = null;
    }

    const messageFromJson =
      parsed &&
      typeof parsed === 'object' &&
      parsed !== null
        ? (parsed as { message?: unknown }).message
        : undefined;

    const finalMessage =
      typeof messageFromJson === 'string'
        ? messageFromJson
        : text
          ? text
          : 'API error';

    throw new Error(
      `${response.status} ${finalMessage}`
    );
  }

  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};