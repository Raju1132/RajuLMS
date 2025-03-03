import { createSlice } from '@reduxjs/toolkit';


const roleSlice = createSlice({
  name: 'Role', 
  initialState: 'HO', 
  reducers: {
    setRole: (state, action) => action.payload,
  },
});

// Export the action
export const { setRole } = roleSlice.actions;

// Export the reducer
export default roleSlice.reducer;
