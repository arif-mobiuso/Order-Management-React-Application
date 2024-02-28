import db from "../../../config/databaseConfig.js";
import { transformAddressDetails } from "../../helper/utilities.js";

export const addCustomerAddress = async (addressDetails) => {
    return new Promise((resolve, reject) => {
        try {
            const addAddressQuery = `insert into address (address_line1 , address_line2 , city , state , pincode ,country) values ("${addressDetails.addressLine1}" , "${addressDetails.addressLine2}" , "${addressDetails.city}" ,"${addressDetails.state}" , ${addressDetails.pincode} , "${addressDetails.country}" )`;

            db.query(addAddressQuery, function (error, result) {
                if (error) {
                    console.log("Error in addAddressQuery : ", error);
                    reject(error);
                }
                else {
                    console.log(result);
                    resolve({
                        addressId: result.insertId  });
                }
            });
        }
        catch (error) {
            console.log("Error in adding new customerAddress ! ", error);
            reject({ message: error.error });
        }
    });
};

export const getAddressDetails = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAddressDetailsQuery = `select * from address`;
            db.query(getAddressDetailsQuery, function (error, result) {
                if (error) {
                    console.log("Error in getAddressDetailsQuery : ", error);
                    reject(error);
                }
                else {
                    console.log(result);
                    resolve({
                            message: "Sucessfully Fetched all Address Details !",
                             result: result.map(transformAddressDetails)
                    });
                }
            });
        }
        catch (error) {
            console.log("Error in getAddressDetails : ", error);
            reject(error);
        }
    });
};


export const getAddressDetailsById = async (addressId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const getAddressDetailsByIdQuery = `select * from address where address_id = ${addressId}`;
            db.query(getAddressDetailsByIdQuery, function (error, result) {
                if (error) {
                    console.log("Error in getAddressDetailsByIdQuery : ", error);
                    reject(error);
                }
                else {
                    console.log(result);
                    if (result.length == 0) {
                        resolve({ statusCode: 404, status: { message: "Address not found !" } });
                    }
                    else {
                        resolve({                            
                                message: `Sucessfully Fetched Address Details for addressId = ${addressId} !`,
                                result: result.map(transformAddressDetails)
                        });
                    }
                }
            });
        }
        catch (error) {
            console.log("Error in getAddressDetailsById : ", error);
            reject(error);
        }
    });
};