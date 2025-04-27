import { useAuthStore } from '../store/auth';
import router from '../router';

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return handleBadRequest(data);
      case 401:
        return handleUnauthorized();
      case 403:
        return handleForbidden();
      case 404:
        return handleNotFound();
      case 409:
        return handleConflict(data);
      case 422:
        return handleValidationError(data);
      case 429:
        return handleRateLimit(data);
      case 500:
        return handleServerError();
      default:
        return handleGenericError(error);
    }
  } else if (error.request) {
    // The request was made but no response was received
    return handleNetworkError();
  } else {
    // Something happened in setting up the request that triggered an Error
    return handleRequestError(error);
  }
};

const handleBadRequest = (data) => {
  return new ApiError(
    data.message || 'Invalid request. Please check your input.',
    400,
    data.code || 'BAD_REQUEST'
  );
};

const handleUnauthorized = () => {
  const authStore = useAuthStore();
  authStore.logout();
  router.push('/login?error=unauthorized');
  return new ApiError(
    'Your session has expired. Please log in again.',
    401,
    'UNAUTHORIZED'
  );
};

const handleForbidden = () => {
  router.push('/unauthorized');
  return new ApiError(
    'You do not have permission to access this resource.',
    403,
    'FORBIDDEN'
  );
};

const handleNotFound = () => {
  return new ApiError(
    'The requested resource was not found.',
    404,
    'NOT_FOUND'
  );
};

const handleConflict = (data) => {
  return new ApiError(
    data.message || 'A conflict occurred with the current state of the resource.',
    409,
    data.code || 'CONFLICT'
  );
};

const handleValidationError = (data) => {
  return new ApiError(
    data.message || 'Validation failed. Please check your input.',
    422,
    data.code || 'VALIDATION_ERROR'
  );
};

const handleRateLimit = (data) => {
  return new ApiError(
    data.message || 'Too many requests. Please try again later.',
    429,
    data.code || 'RATE_LIMIT_EXCEEDED'
  );
};

const handleServerError = () => {
  return new ApiError(
    'An unexpected error occurred. Please try again later.',
    500,
    'SERVER_ERROR'
  );
};

const handleNetworkError = () => {
  return new ApiError(
    'Network error. Please check your connection and try again.',
    0,
    'NETWORK_ERROR'
  );
};

const handleRequestError = (error) => {
  return new ApiError(
    error.message || 'An error occurred while processing your request.',
    0,
    'REQUEST_ERROR'
  );
};

const handleGenericError = (error) => {
  return new ApiError(
    error.message || 'An unexpected error occurred.',
    error.status || 500,
    error.code || 'UNKNOWN_ERROR'
  );
};

export const showErrorNotification = (error) => {
  // This would integrate with your notification system
  console.error('Error:', error.message);
  // You can add your notification system here (e.g., toast, alert, etc.)
};

export const isApiError = (error) => {
  return error instanceof ApiError;
}; 