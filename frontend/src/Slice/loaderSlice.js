import { createSlice } from "@reduxjs/toolkit"

export const LoaderSlice = createSlice({
    name: "loader",
    initialState: {
        isLoading: false
    },
    reducers: {
        loadingAction: (state, action) => {
            state.isLoading = action.payload
        },
    }
})

export const { loadingAction } = LoaderSlice.actions;
export default LoaderSlice.reducer;