import axios from 'axios';

// Base64 Credentials for the API
const clientId = '66227855cfd86a416d9ad70e';
const secretId = 'e6e01bb8-cf88-495f-825b-2581210e9c4b';
const base64Credentials = btoa(`${clientId}:${secretId}`);

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://beta-api.pattern50.com/auth/sign-in',
      {
        refreshToken: localStorage.getItem('refreshToken'),
        grantType: 'refreshToken',
      },
      {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      }
    );
    const newAuth = response.data.auth;

    // Update tokens in local storage
    localStorage.setItem('accessToken', newAuth.accessToken);
    localStorage.setItem('refreshToken', newAuth.refreshToken);

    return newAuth.accessToken;
  } catch (error) {
    console.log('Error refreshing access token:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
};

// Axios instance with interceptors
const axiosRequest = axios.create({
  baseURL: process.env.Next_BASE_URL,
});

// Add request interceptor
axiosRequest.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        const newAccessToken = await refreshAccessToken();

        // Retry the original request with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosRequest(originalRequest);
      } catch (refreshError) {
        console.log('Refresh token failed or invalid:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosRequest;
