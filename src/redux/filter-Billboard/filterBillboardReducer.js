import { createSlice } from '@reduxjs/toolkit';

const filterBillboardReducer = createSlice({
  name: 'filterBillboard',
  initialState: { category: 'all', type: 'all', keyword: '' },
  reducers: {
    filterBillboardData: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { filterBillboardData } = filterBillboardReducer.actions;

export default filterBillboardReducer.reducer;
