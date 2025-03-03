import { configureStore } from '@reduxjs/toolkit';
import roleReducer from '../features/RoleSlice';
import drawerReducer from '../features/DrawerSlice';

const store = configureStore({
  reducer: {
    role: roleReducer, 
    drawer: drawerReducer, 
  },
});

export default store;
