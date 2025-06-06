
// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  console.warn(
    "Warning: NEXT_PUBLIC_API_URL environment variable is not set. API calls might fail. " +
    "Please create a .env.local file in the root directory and add NEXT_PUBLIC_API_URL=your_api_url (e.g., http://localhost:3001)"
  );
}

// Function to retrieve the auth token (implement according to your storage method)
function getToken(): string | null {
  // Check if running in the browser environment before accessing localStorage
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

interface ApiCallOptions extends RequestInit {
  params?: Record<string, string>;
}

// Renamed generic type to TResponse for clarity
async function apiFetch<TResponse>(endpoint: string, options: ApiCallOptions = {}): Promise<TResponse> {
  const { params, ...fetchOptions } = options;
  let url = `${API_BASE_URL || ''}${endpoint}`;

  if (params) {
    const queryParams = new URLSearchParams(params);
    url += `?${queryParams.toString()}`;
  }

  const token = getToken();

  // Default headers including Authorization if token exists
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Add Authorization header if token exists
    ...(fetchOptions.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore if response body is not JSON or empty
      }
      console.error(`API Error ${response.status}: ${response.statusText}`, errorData);
      // Try to provide a more specific error message from the backend if available
      const message = errorData?.message || (Array.isArray(errorData?.message) ? errorData.message.join(', ') : response.statusText);
      throw new Error(`API request failed with status ${response.status}: ${message}`);
    }

    if (response.status === 204) {
      // Return undefined for No Content responses, cast to TResponse
      return undefined as TResponse;
    }

    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json() as TResponse;
    } else {
        // Handle non-JSON responses if necessary, or return as is/undefined
        console.warn(`Received non-JSON response from ${url}`);
        // Return undefined for non-JSON responses, cast to TResponse
        return undefined as TResponse;
    }

  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
}

// Export API helper functions with improved type safety for body
export const api = {
  get: <TResponse>(endpoint: string, options: Omit<ApiCallOptions, 'method' | 'body'> = {}) =>
    apiFetch<TResponse>(endpoint, { ...options, method: 'GET' }),

  // Use generic TBody for the request body type
  post: <TResponse, TBody>(endpoint: string, body: TBody, options: Omit<ApiCallOptions, 'method' | 'body'> = {}) =>
    apiFetch<TResponse>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  // Use generic TBody for the request body type
  put: <TResponse, TBody>(endpoint: string, body: TBody, options: Omit<ApiCallOptions, 'method' | 'body'> = {}) =>
    apiFetch<TResponse>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: <TResponse>(endpoint: string, options: Omit<ApiCallOptions, 'method' | 'body'> = {}) =>
    apiFetch<TResponse>(endpoint, { ...options, method: 'DELETE' }),

  // Use generic TBody for the request body type
  patch: <TResponse, TBody>(endpoint: string, body: TBody, options: Omit<ApiCallOptions, 'method' | 'body'> = {}) =>
    apiFetch<TResponse>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
};

