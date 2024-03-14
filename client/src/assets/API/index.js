import axios from "axios";

export const API_URL = "http://localhost:4242/api/v1";

export const getAllProducts = async () => {
    try {
        const result = await axios.get(`${API_URL}/products`);
        return result.data;
    } catch (err) {
        return null;
    }
};


export const getProductsByCategory = async (category) => {
    try {
        const result = await axios.get(`${API_URL}/products`, { params: { category: category } });
        return result.data;
    } catch (err) {
        return null;
    }
};

export const getCategories = async () => {
    try {
        const result = await axios.get(`${API_URL}/products/categories`);
        return result.data;
    } catch (err) {
        return null;
    }
}





export const registerUser = async (customerDetails) => {
    try {
        console.log(customerDetails);
        const result = await axios.post(`${API_URL}/customers`, {
            firstName: customerDetails.firstName,
            lastName: customerDetails.lastName,
            email: customerDetails.email,
            phone: customerDetails.number,
            addressLine1: customerDetails.addressLine1,
            addressLine2: customerDetails.addressLine2,
            city: customerDetails.city,
            state: customerDetails.state,
            pincode: customerDetails.pincode,
            country: customerDetails.country,
            userName: customerDetails.username,
            gender: customerDetails.gender,
            password: customerDetails.password,
        });
        return result.data;
    } catch (err) {
        return err.message;
    }
}



export const login = async (credInfo) => {
    try {
        // console.log(credInfo)
        const result = await axios.post(`${API_URL}/users/login`, {

            email: credInfo.email,
            password: credInfo.password,

        });
        console.log(result.data);
        return result.data;
    }
    catch (error) {
        return error;
    }
}

export const placeOrder = async (orderInfo, userId) => {
    try {
        const result = await axios.post(`${API_URL}/customers/${userId}/orders`, orderInfo);
        // console.log(result.data);
        return result.data;
    }
    catch (error) {
        return error
    }
}


export const getCustomerDetails = async (customerId) => {
    try {
        const result = await axios.get(`${API_URL}/customers/${customerId}`);
        return result.data;
    }
    catch (error) {
        return error
    }
}

