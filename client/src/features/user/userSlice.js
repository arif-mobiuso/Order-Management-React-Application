import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isAuthenticated: false,
    cartItems: [],
    userDetails: {
        userId: null,
    },
    token: "",
    orders: [],
    wishlistItems: []
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.data.token;
            state.isAuthenticated = true;
        },
        logoutSuccess(state) {
            state.token = "";
            state.isAuthenticated = false;
            state.userDetails = [];
        },
        wishlist(state, action) {
            const newItem = action.payload;
            state.wishlistItems.push(newItem);
        },
        deleteWishlist: (state, action) => {
            const id = action.payload.id;
            state.wishlistItems = state.wishlistItems.filter((item) => item.id !== id);
        },
        addUserDetails: (state, action) => {
            state.userDetails = action.payload.user;
        }
    }
})








export default userSlice.reducer
export const { loginSuccess,
    logoutSuccess,
    wishlist,
    deleteWishlist, 
    addUserDetails,
} = userSlice.actions



