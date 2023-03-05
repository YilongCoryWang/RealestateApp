import { configureStore } from "@reduxjs/toolkit";
import PropertyStatusReducer from "./propertyStatus.slice"
import LoginStatusReducer from "./loginStatus.slice";

export default configureStore({
    devTools: process.env.NODE_ENV!=="production",
    reducer: {
        status: PropertyStatusReducer,
        isLogin: LoginStatusReducer
    }
})