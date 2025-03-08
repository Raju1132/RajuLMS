import { createSlice } from '@reduxjs/toolkit';
import { Roles } from '../utils/constants';

// Using the Roles object from constants.js
const roleSlice = createSlice({
  name: 'role', 
  initialState: Roles.Admin, // Default to Admin role
  reducers: {
    setRole: (state, action) => {
      // Validate that the received role is valid
      if (Object.values(Roles).includes(action.payload)) {
        return action.payload;
      }
      // If invalid role is provided, keep current state
      return state;
    },
  },
});

// Export the action
export const { setRole } = roleSlice.actions;

// Export the reducer
export default roleSlice.reducer;