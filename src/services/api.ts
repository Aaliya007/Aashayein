export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.aashayein.example';

export interface ApiRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

export interface ApiClient {
  get<T>(path: string, config?: ApiRequestConfig): Promise<T>;
  post<T>(path: string, body?: unknown, config?: ApiRequestConfig): Promise<T>;
  put<T>(path: string, body?: unknown, config?: ApiRequestConfig): Promise<T>;
  delete<T>(path: string, config?: ApiRequestConfig): Promise<T>;
}

function buildUrl(path: string, params?: ApiRequestConfig['params']): string {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  config?: ApiRequestConfig,
): Promise<T> {
  const response = await fetch(buildUrl(path, config?.params), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...config?.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const apiClient: ApiClient = {
  get: (path, config) => request('GET', path, undefined, config),
  post: (path, body, config) => request('POST', path, body, config),
  put: (path, body, config) => request('PUT', path, body, config),
  delete: (path, config) => request('DELETE', path, undefined, config),
};

export function setAuthToken(_token: string): void {
  // Will attach Authorization header once Spring Boot auth is integrated.
}
