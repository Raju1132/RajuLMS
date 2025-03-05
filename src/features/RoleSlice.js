import { createSlice } from '@reduxjs/toolkit';


const roles = {
  ADMIN: 'Admin',
  USER: 'User',
};

const roleSlice = createSlice({
  name: 'Role', 
  initialState: roles.ADMIN, 
  reducers: {
    setRole: (state, action) => action.payload,
  },
});

// Export the action
export const { setRole } = roleSlice.actions;

// Export the reducer
export default roleSlice.reducer;
