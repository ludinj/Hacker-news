import { configureStore } from "@reduxjs/toolkit";
import myFavSlice from "./myFavSlice";

export default configureStore({
  reducer: {
    myFav: myFavSlice,
  },
});
