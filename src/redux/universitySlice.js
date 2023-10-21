import { createSlice } from '@reduxjs/toolkit'

const universitySlice = createSlice({
  name: 'universities',
  initialState: [],
  reducers: {
    addUniversity: (state, action) => {
      const newUniversity = {
        ...action.payload,
        id: state.length, 
      };
      state.push(newUniversity);
    },
    editUniversity: (state, action) => {
      const { id, updatedUniversity } = action.payload;
      const index = state.findIndex(university => university.id === id);
      
      if (index !== -1) {
        state[index] = updatedUniversity;
      }
    },
    deleteUniversity: (state, action) => {
      const id = action.payload;
      return state.filter(university => university.id !== id);
    },
    addAllUniversities: (state, action) => {
      console.log(action.payload);
      return action.payload.map((university, index) => ({
        ...university,
        id: index
      }));
    },
  },
});

export const { addAllUniversities, addUniversity, editUniversity, deleteUniversity } = universitySlice.actions
export default universitySlice.reducer
