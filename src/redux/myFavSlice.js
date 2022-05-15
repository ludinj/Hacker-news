import { createSlice } from "@reduxjs/toolkit";
const myFav = JSON.parse(localStorage.getItem("myFav"));
export const myFavSilce = createSlice({
  name: "myFav",
  initialState: {
    myFavData: myFav ? myFav : [],
    pending: null,
    error: false,
  },

  reducers: {
    addFav: (state, action) => {
      state.myFavData = action.payload;
      state.pending = false;
      state.error = false;
    },
    deleteFav: (state, action) => {
      state.myFavData = action.payload;
      state.error = true;
      state.pending = false;
    },
  },
});

export const { addFav, deleteFav } = myFavSilce.actions;
export default myFavSilce.reducer;
