import { createSlice } from "@reduxjs/toolkit";

const {actions, reducer: PropertyStatusReducer} = createSlice({
    name: "propertyStatus",
    initialState: "FORSALE",
    reducers: {
        updatePropertyStatus(state, action){
            if(["FORSALE", "RENT", "SOLD"].includes(action.payload)){
                state = action.payload
            }
            return state
        },
    }
})

export const { updatePropertyStatus } = actions
export default PropertyStatusReducer