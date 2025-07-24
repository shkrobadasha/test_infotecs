import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import modalWindowReducer from "./modalWindowSlice.js"

export default configureStore({
    reducer: {
        users: userReducer,
        modalWindow: modalWindowReducer
    }    
})