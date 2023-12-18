// config.js
const isProduction = process.env.NODE_ENV === 'production';

export const API_BASE_URL = isProduction
  ? 'https://flex-yoga-app.onrender.com'
  : process.env.API_BASE_URL || 'http://localhost:5000';
