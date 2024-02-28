import express from "express";

// importing product routes


import productRoute from "./product/productRoute.js";
import userRoute from "./users/userRoute.js";
import customerRoute from "./customer/customerRoute.js";
import addressRoute from "./address/addressRoute.js";
import orderRoute from "./orders/orderRoute.js";


const router = express.Router();

//  redirect to product routes 
router.use("/products", productRoute); 

router.use("/users", userRoute);

router.use("/customers", customerRoute);

router.use("/addressess", addressRoute);

router.use("/orders", orderRoute);








export default router;