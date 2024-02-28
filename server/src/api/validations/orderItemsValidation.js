import yup from "yup"; 



const productSchema = yup.object({
    productId: yup.number().required().positive().integer(),
    productQuantity: yup.number().required().positive().integer()
});

const orderItemsSchema = yup.object({
    products: yup.array().of(productSchema).required()
});
export default orderItemsSchema ; 