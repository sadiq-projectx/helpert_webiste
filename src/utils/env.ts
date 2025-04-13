/**
 * Safely get environment variables with fallbacks
 */

// API Base URL
export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.helperts.com';
};

// App URL
export const getAppUrl = (): string => {
  return process.env.NEXT_PUBLIC_APP_URL || 'https://helperts.com';
};

// Check if we're in production
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

// Check if we're in development
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
}; 