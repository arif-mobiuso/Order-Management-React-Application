import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isAuthenticated: false,
    cartItems: [],
    user: {
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
            state.user.userId = action.payload.data.customerId;
        },
        logoutSuccess(state) {
            state.token = "";
            state.isAuthenticated = false;
            state.user.userId = null;
        },
        wishlist(state, action) {
            const newItem = action.payload;
            state.wishlistItems.push(newItem);
        },
        deleteWishlist: (state, action) => {
            const id = action.payload.id;
            state.wishlistItems = state.wishlistItems.filter((item) => item.id !== id);
        },
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.cartItems.push(newItem);
        },
        deleteFromCart: (state, action) => {
            const id = action.payload.id;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
        }
    }
})








export default userSlice.reducer
export const { loginSuccess,
    logoutSuccess,
    wishlist,
    deleteWishlist, 
    addToCart, 
    deleteFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity
} = userSlice.actions



