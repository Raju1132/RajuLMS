import { createSlice } from '@reduxjs/toolkit';


const DrawerSlice = createSlice({
  name: 'drawer', 
  initialState: false, 
  reducers: {
    setDrawer: (state, action) => action.payload,
  },
});

// Export the action
export const { setDrawer } = DrawerSlice.actions;

// Export the reducer
export default DrawerSlice.reducer;
