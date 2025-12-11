import axios from "axios";
import { useAuthStore } from "../store/authStore.js";

/**
 * API Client Configuration
 * 
 * baseURL resolution:
 * - If VITE_API_URL is set: Use it (required for production or custom deployments)
 * - Development (no VITE_API_URL): Use relative "/api" to leverage Vite proxy
 * - Production (no VITE_API_URL): Falls back to "/api" with warning
 * 
 * For production deployments, set VITE_API_URL in your build environment:
 * VITE_API_URL=https://api.yourdomain.com/api
 */
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Development: relative path uses Vite proxy (configured in vite.config.js)
  if (import.meta.env.DEV) {
    return "/api";
  }
  
  // Production: warn if VITE_API_URL not set
  if (import.meta.env.PROD) {
    console.warn(
      "⚠️ VITE_API_URL not set in production! " +
      "API requests may fail. Set VITE_API_URL to your backend URL."
    );
  }
  
  return "/api";
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    // But don't redirect if we're already on the login page (login failed)
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;


