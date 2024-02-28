import * as productServices from "../service/productService.js";

export const getAllProductsController = async (req, res) => {
    try {
        const productCategory = req.query.category;
        if (productCategory == undefined) {   
            const productList = await productServices.getAllProductsService();
            return res.status(200).send(productList);
        } else {
            const productList = await productServices.getProductsByCategoryService(productCategory);
            return res.status(200).send(productList);
        }

    }
    catch (error) {
        console.error("Error in getAllProductsController:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

export const getProductsByCategoryController = async (req, res) => {
    try {
        const productCategory = req.query.category;
        const productList = await productServices.getProductsByCategoryService(productCategory);
        return res.status(200).send(productList);
    }
    catch (error) {
        console.error("Error in getProductsByCategoryController:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

export const getCategoriesController = async (req, res) => {
    try {
        const categoriesList = await productServices.getCategoriesService();
        return res.status(200).send(categoriesList);
    }
    catch (error) {
        console.error("Error in getCategoriesController:", error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

