import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state,action) => {
        console.log(state.value);
        console.log(action.payload);
        state.value = action.payload
    },
    userNameUpdate: (state,action) => {
      if(state.value && state.value.user){
        state.value.user.displayName = action.payload;
      }
      const updateProfileName = {...state.value}
      localStorage.setItem("userInfo", JSON.stringify(updateProfileName))
    }
  },
})

export const { userInfo,userNameUpdate } = userSlice.actions

export default userSlice.reducer