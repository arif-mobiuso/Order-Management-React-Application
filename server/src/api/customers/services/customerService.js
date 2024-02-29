import db from "../../../config/databaseConfig.js";
import * as addressService from "../../address/services/addressService.js";
import * as userServices from "../../users/services/userServices.js"
import { transformCustomerDetails } from "../../helper/utilities.js";

// to add new customer to online_customer table
export const NewCustomer = async (cutomerDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentDate = new Date();
            const customerCreationDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
            const addAddressIdResult = await addressService.addCustomerAddress(cutomerDetails);
            const addCustomerQuery = `insert into online_customer  (customer_fname ,customer_lname  , customer_email , customer_phone , address_id , customer_creation_date , customer_username , customer_gender ) values ("${cutomerDetails.firstName}" ,"${cutomerDetails.lastName}" ,"${cutomerDetails.email}" ,${cutomerDetails.phone} ,${addAddressIdResult.addressId} ,'${customerCreationDate}' ,"${cutomerDetails.userName} ","${cutomerDetails.gender}" ) ; `;
            db.query(addCustomerQuery, async function (error, result) {
                if (error) {
                    reject({ message: error.message });
                }
                else {
                    const addUser = await userServices.newUser(cutomerDetails, result.insertId);
                    console.log(result);
                    resolve({
                        message: "Sucessfully created new Customer!",
                        customerId: result.insertId
                    });
                }
            });
        }
        catch (error) {
            console.error("Error in Creating New Cutomer : ", error);
        }
    });
};

// To fetch all customer details from online_customer table 
export const getCustomerDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAllCustomersQuery = `select * from online_customer`;
            db.query(getAllCustomersQuery, function (error, result) {
                if (error) {
                    return reject({ message: error.message });

                }
                else {
                    resolve({
                        message: "Sucessfully  fecthed Customer Details! ",
                        result: result.map(transformCustomerDetails),
                    });
                }
            });
        }
        catch (error) {
            console.error("Error in getCustomerDetails : ", error);
            reject(error);
        }
    });
};



export const getCustomerById = (customerId) => {
    return new Promise((resolve, reject) => {
        try {
            const fetchCustomerByIdQuery = `select * from online_customer join address on address.address_id = online_customer.ADDRESS_ID where CUSTOMER_ID =  ${customerId}`;
            db.query(fetchCustomerByIdQuery, function (error, result) {
                if (error) {
                    return reject({ message: error.message });
                }
                resolve({
                    message: `Sucessfully fetched customer Details with customerId ${customerId} ! `,
                    result: result.map(transformCustomerDetails)
                });
            });
        }
        catch (error) {
            console.error("Error in getCustomerById : ", error);
            reject({ message: error.message });
        }
    });
};


export const deleteCustomerById = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteCustomerByIdQuery = `delete from online_customer where customer_id = ${customerId}`;
            db.query(deleteCustomerByIdQuery, async function (error, result) {
                if (error) {
                    return reject({ message: error.message });

                }
                await userServices.deleteUser(customerId) ;
                return resolve({
                    message: `Sucessfully deleted  Customer  with customerId ${customerId} ! `,
                    result: result
                });
            });
        }
        catch (err) {
            console.error("Error in deleteCustomerById :", err);
            reject(err);
        }
    });
};





export const updateCustomer = (customerId, customerDetails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateCustomerQuery = `UPDATE ONLINE_CUSTOMER 
                INNER JOIN ADDRESS ON ADDRESS.ADDRESS_ID = ONLINE_CUSTOMER.ADDRESS_ID
                JOIN USERS ON ONLINE_CUSTOMER.CUSTOMER_ID = USERS.CUSTOMER_ID
                SET CUSTOMER_FNAME = ?, CUSTOMER_LNAME = ?, CUSTOMER_EMAIL = ?, USERS.EMAIL = ?, CUSTOMER_PHONE = ?,
                CUSTOMER_USERNAME = ? , NAME  = ?, CUSTOMER_GENDER = ?, ADDRESS_LINE1 = ?, ADDRESS_LINE2 = ?,
                CITY = ?, STATE = ?, PINCODE = ?, COUNTRY = ? 
                WHERE ONLINE_CUSTOMER.CUSTOMER_ID = ${customerId}`;

            const values = [
                customerDetails.firstName,
                customerDetails.lastName,
                customerDetails.email,
                customerDetails.email,
                customerDetails.phone,
                customerDetails.userName,
                customerDetails.userName,
                customerDetails.gender,
                customerDetails.addressLine1,
                customerDetails.addressLine2,
                customerDetails.city,
                customerDetails.state,
                customerDetails.pincode,
                customerDetails.country,
            ];

            db.query(updateCustomerQuery, values, (error, result) => {
                if (error) {
                    console.log(error);
                    return reject({ message: "Error in Query!" });
                }
                if (result.affectedRows == 0) {
                    return reject({ message: "Customer Not Found - cannot update" });
                }
                return resolve({ message: "Customer Updated Successfully", result });
            });
        } catch (error) {
            return reject({ message: "Internal Server Error!" });
        }
    });
};