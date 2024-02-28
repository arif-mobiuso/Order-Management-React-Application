import * as addressService from "../services/addressService.js";

export const getAllAddresses = async (req, res)=>{
    try{
        const address = await addressService.getAddressDetails() ; 
        console.log(address.message);
        return res.status(200).send({message :address.message , result : address.result });
    }
    catch(error){
        if(error){
            console.error("Error in getAllAddresses:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }

    }
};

export const getAddressById = async (req, res)=>{
    try{
        const addressId = req.params.id ;
        const address = await addressService.getAddressDetailsById(addressId);
        return res.status(200).send({message : address.message , result : address.result});
    }
    catch(error){
        if(error){
            console.error("Error in getAddressById:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
};
