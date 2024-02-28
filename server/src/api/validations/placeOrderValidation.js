import * as yup from "yup";

const productSchema = yup.object({
    productId: yup.number().required().positive().integer(),
    productQuantity: yup.number().required().positive().integer()
});

const placeOrderSchema = yup.object({
    paymentMode: yup.string().required(),
    products: yup.array().of(productSchema).required()
});

export default placeOrderSchema;
