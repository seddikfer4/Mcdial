/**
 * Utility function to make authenticated fetch requests
 * This ensures all API calls include the authentication token
 * 
 * @param {string} url - The URL to fetch
 * @param {RequestInit} [options={}] - Fetch options (optional)
 * @returns {Promise<Response>} - The fetch response
 */
export async function fetchWithAuth(url, options = {}) {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  
  // Create headers with authentication if token exists
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Create the final request options
  const requestOptions = {
    ...options,
    credentials: 'include', // TypeScript: RequestCredentials type
    headers: headers
  };
  
  // Make the authenticated request
  return fetch(url, requestOptions);
}
