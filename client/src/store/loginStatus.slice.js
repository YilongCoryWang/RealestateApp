import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer: LoginStatusReducer} = createSlice({
    name: "loginStatus",
    initialState: false,
    reducers: {
        updateLoginStatus(state, action){
            return action.payload
        },
    }
})

export const { updateLoginStatus } = actions
export default LoginStatusReducer