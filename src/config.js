// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://ensync-backend.onrender.com'  // Update this after deploying backend
    : 'http://localhost:5001');

export const API_ENDPOINTS = {
  SIGN_LANGUAGE_PREDICT: `${API_URL}/api/sign-language/predict`,
  SIGN_LANGUAGE_ALPHABET: `${API_URL}/api/sign-language/alphabet`,
  HEALTH_CHECK: `${API_URL}/health`,
};

// App Configuration
export const APP_CONFIG = {
  name: 'EnSync',
  tagline: 'Speak, Move, Stay EnSync',
  version: '1.0.0',
};
