import { configureStore } from "@reduxjs/toolkit";
import PropertyStatusReducer from "./propertyStatus.slice"

export default configureStore({
    devTools: process.env.NODE_ENV!=="production",
    reducer: {
        status: PropertyStatusReducer,
    }
})