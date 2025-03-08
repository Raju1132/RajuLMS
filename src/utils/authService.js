import { Roles } from '../utils/constants';

// Mock authentication service
// In a real application, this would communicate with a backend API
export const LoginUser = async ({ payload }) => {
  // Simulate API call with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check credentials (in real app, this would be server-side)
      if (!payload.userId || !payload.password) {
        reject({ response: { data: { error: "Invalid credentials" } } });
        return;
      }

      // Map form values to actual role types
      const roleMapping = {
        'admin': Roles.Admin,
        'user': Roles.User
      };

      // Create response object with user info
      const userData = {
        userId: payload.userId,
        roleType: roleMapping[payload.userType] || Roles.User,
        userName: `User-${payload.userId}`,
        // Additional user data would come from backend
      };

      // Store in localStorage
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      resolve(userData);
    }, 800); // Simulate network delay
  });
};

// Load user data from localStorage
export const loadUserData = () => {
  try {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error("Error loading user data", error);
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('user_data');
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('user_data');
};