import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/CartSlice';
import userReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import { persistReducer  , persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig = {
  key: "root", 
  storage, 
  // whitelist : ['cart']
}


const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  product : productReducer
}) 


const persistedReducer = persistReducer(persistConfig , rootReducer)

export const store =  configureStore({
  reducer: persistedReducer,
});

export const  persistor = persistStore(store)


