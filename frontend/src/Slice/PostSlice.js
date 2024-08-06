import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice ({
    name:'post',
    initialState: {
        data: []
    },
    reducers: {
        saveAllPost(state, action) {
            state.data = action.payload;
        }
    }
})

export const {saveAllPost} = postSlice.actions;
export default postSlice.reducer;