import db from "../../../config/databaseConfig.js"; 
import { transformProductDetails } from "../../helper/utilities.js";

export const getAllProductsService = () => {
    return new Promise((resolve, reject) => {
        try {
            const fetchProductsQuery = `select * from product join product_class on product.PRODUCT_CLASS_CODE = product_class.PRODUCT_CLASS_CODE ;`;
            db.query(fetchProductsQuery, function (error, result) {
                if (error) {
                    console.log("Error in fetchProductsQuery", error);
                    reject(error);
                } else {
                    // console.log(result);
                    resolve(result.map(transformProductDetails));
                }
            });
        } catch (error) {
            console.error("Error in getAllProductsService: ", error);
            reject(error);
        }
    });
};

export const getProductsByCategoryService = (productCategory) => {
    return new Promise((resolve, reject) => {
        try {
            const fetchProductsByCategoryQuery = `select * from product join product_class on product.PRODUCT_CLASS_CODE = product_class.PRODUCT_CLASS_CODE where PRODUCT_CLASS_DESC = "${productCategory}";`;
            db.query(fetchProductsByCategoryQuery , function (error, result) {
                if (error) {
                    console.log("Error in fetchProductsByCategoryQuery ", error);
                    reject(error);
                } else {
                    resolve(result.map(transformProductDetails));
                }
            });
        } catch (error) {
            console.error("Error in getProductsByCategoryService: ", error);
            reject(error);
        }
    });
};



export const getCategoriesService = () => {
    return new Promise((resolve, reject) => {
        try {
            const fetchCategoriesQuery = `select PRODUCT_CLASS_DESC from product_class`;
            db.query(fetchCategoriesQuery , function (error, result) {
                if (error) {
                    console.log("Error in fetchCategoriesQuery ", error);
                    reject(error);
                } else {
                    const categoryList = []
                    result.map((cat) => {
                        categoryList.push(cat.PRODUCT_CLASS_DESC);
                    } )
                    resolve(categoryList);
                }
            });
        } catch (error) {
            console.error("Error in getCategoriesService: ", error);
            reject(error);
        }
    });
};




