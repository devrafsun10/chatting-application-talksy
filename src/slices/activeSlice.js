import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:""
};

export const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    activeInfo: (state,action) => {
        console.log(state.value);
        console.log(action.payload);
        state.value = action.payload
    },
  },
})

export const { activeInfo } = activeSlice.actions

export default activeSlice.reducer