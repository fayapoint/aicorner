// API configuration that works for both local development and production

const isProduction = process.env.NODE_ENV === 'production' || typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const isNetlify = typeof window !== 'undefined' && window.location.hostname.includes('netlify') || window.location.hostname === 'ainseconds.shop';

// For production/Netlify, use Netlify functions
// For local development, we'll create mock endpoints
export const API_BASE_URL = isProduction || isNetlify ? '/.netlify/functions' : '/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth-login`,
  VERIFY: `${API_BASE_URL}/auth-verify`,
  
  // News endpoints
  NEWS: `${API_BASE_URL}/news`,
  NEWS_SINGLE: (id: string) => `${API_BASE_URL}/news-single?id=${id}`,
  
  // Video endpoints
  VIDEOS: `${API_BASE_URL}/videos`,
  VIDEOS_SINGLE: (id: string) => `${API_BASE_URL}/videos-single?id=${id}`,
  
  // Upload endpoints
  UPLOAD_IMAGE: `${API_BASE_URL}/upload-image`,
  UPLOAD_VIDEO: `${API_BASE_URL}/upload-video`,
  
  // Health endpoint
  HEALTH: `${API_BASE_URL}/health`
};

// Helper function to get the correct API URL
export function getApiUrl(endpoint: string): string {
  if (isProduction || isNetlify) {
    return endpoint.replace('/api/', '/.netlify/functions/');
  }
  return endpoint;
}

// Helper function to make authenticated requests
export async function makeAuthenticatedRequest(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
}

export default API_ENDPOINTS;
