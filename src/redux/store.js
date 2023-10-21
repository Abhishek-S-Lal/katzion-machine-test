import { configureStore } from '@reduxjs/toolkit';
import universityReducer from './universitySlice';

const store = configureStore({
  reducer: {
    universities: universityReducer,
  },
});

export default store;
