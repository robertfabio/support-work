import { Script, CreateScriptRequest, UpdateScriptRequest } from '@/types/script';

const API_BASE_URL = 'https://api-support-digio-uber-crud.onrender.com'; // por enquanto
const API_PATH = '/digio.com.br/api/v1';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_PATH}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new Error(`Network error: ${error}`);
  }
}

// GET /scripts - Buscar todos os scripts
export async function getAllScripts(): Promise<Script[]> {
  return fetchApi<Script[]>('/scripts');
}

// GET /scripts/:id - Buscar um script específico
export async function getScript(id: number): Promise<Script> {
  return fetchApi<Script>(`/scripts/${id}`);
}

// POST /scripts - Criar novo script
export async function createScript(data: CreateScriptRequest): Promise<Script> {
  return fetchApi<Script>('/scripts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT /scripts/:id - Atualizar script
export async function updateScript(
  id: number,
  data: UpdateScriptRequest
): Promise<Script> {
  return fetchApi<Script>(`/scripts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// DELETE /scripts/:id - Deletar script
export async function deleteScript(id: number): Promise<void> {
  return fetchApi<void>(`/scripts/${id}`, {
    method: 'DELETE',
  });
}

// Buscar scripts por categoria
export async function getScriptsByCategory(categoryId: number): Promise<Script[]> {
  const allScripts = await getAllScripts();
  return allScripts.filter(script => script.category_id === categoryId);
}

// Health check
export async function healthCheck(): Promise<{ status: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}
