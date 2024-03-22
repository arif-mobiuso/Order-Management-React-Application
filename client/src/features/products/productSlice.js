import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    products  : []
}



const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProducts(state, action) {
            state.products = action.payload.products;
        },
    }
})








export default productSlice.reducer
export const { addProducts} = productSlice.actions



