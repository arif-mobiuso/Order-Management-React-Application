import express from "express";

const router = express.Router();

import * as productControllers from "../../products/controller/productController.js"

// Product



// get all products list 
router.get("/", productControllers.getAllProductsController);
router.get("/categories", productControllers.getCategoriesController);



export default router;