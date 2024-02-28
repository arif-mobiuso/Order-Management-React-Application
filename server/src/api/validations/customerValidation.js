import yup from "yup";

const customerSchema = yup.object({

    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().matches(/^\d{10}$/, 'Invalid phone number').required(),
    addressLine1: yup.string().required(),
    addressLine2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    pincode: yup.number().required(),
    country: yup.string().required(),
    userName: yup.string().required(),
    gender: yup.string().required()

});

export default customerSchema;    