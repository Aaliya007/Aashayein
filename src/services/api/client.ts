import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  'https://aashayen-backend.onrender.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
import { API_BASE_URL } from '@/config/api';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export { API_BASE_URL };

const AUTH_PATHS = ['/api/auth/login', '/api/auth/register', '/api/ashas/register'];

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 90_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (config.headers) {
    delete config.headers.Authorization;
    delete config.headers.authorization;
  }

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  },
);
  if (__DEV__) {
    const method = (config.method ?? 'get').toUpperCase();
    const url = `${config.baseURL ?? ''}${config.url ?? ''}`;
    console.log(`API request: ${method} ${url}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`API response: ${response.status}`);
    }
    return response;
  },
  (error: AxiosError<{ message?: string; error?: string }>) => {
    return Promise.reject(toApiError(error));
  },
);

export class ApiRequestError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

function isFriendlyMessage(message: string): boolean {
  return message.length < 180 && !message.includes('Exception') && !message.includes('\tat ') && !message.includes('\n');
}

export function toApiError(error: AxiosError<{ message?: string; error?: string }>): ApiRequestError {
  const status = error.response?.status;
  const raw = error.response?.data?.message ?? error.response?.data?.error ?? '';

  if (status === 400) return new ApiRequestError('Please check the information you entered.', status);
  if (status === 404) return new ApiRequestError('Requested information was not found.', status);
  if (status === 409) return new ApiRequestError('This record already exists.', status);
  if (status === 503) return new ApiRequestError('Service is temporarily unavailable. Please try again.', status);
  if (status && status >= 500) return new ApiRequestError('Something went wrong. Please try again.', status);

  if (error.code === 'ECONNABORTED') {
    return new ApiRequestError('The server is taking longer than usual to respond. Please try again.', status);
  }

  if (error.message === 'Network Error' || !error.response) {
    return new ApiRequestError('Unable to connect to Aashayein server.', status);
  }

  if (raw && isFriendlyMessage(raw)) {
    return new ApiRequestError(raw, status);
  }

  return new ApiRequestError('Something went wrong. Please try again.', status);
}

function compactParams(params?: Record<string, string | number | boolean | undefined>) {
  if (!params) return undefined;
  const next: Record<string, string | number | boolean> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      next[key] = value;
    }
  });
  return Object.keys(next).length ? next : undefined;
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  const { data } = await apiClient.get<T>(path, { params: compactParams(params) });
  return data;
}

export async function apiPost<T>(path: string, body: unknown, config?: AxiosRequestConfig): Promise<T> {
  const isAuth = AUTH_PATHS.some((item) => path.startsWith(item));
  if (__DEV__ && isAuth) {
    console.log('API request body: [redacted]');
  }
  const { data } = await apiClient.post<T>(path, body, config);
  return data;
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const { data } = await apiClient.put<T>(path, body);
  return data;
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const { data } = await apiClient.patch<T>(path, body);
  return data;
}
