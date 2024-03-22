

import * as customerService from "../services/customerService.js" ;
import * as orderService from "../../orders/services/orderService.js" ;




export const addNewCustomer =  async (req, res)  => {
     try {
         const cutomerDetails = req.body; 
         console.log(cutomerDetails);
    const customer  = await customerService.NewCustomer(cutomerDetails) ;
    return res.status(201).send({message : customer.message , customerId : customer.customerId });
     }
     catch(error){
          console.error("Error in addNewCustomer:", error);
          return res.status(500).send({ message: error.message});
     }
};



export const getAllCustomers = async (req , res) =>{
    try{
       const customer =await customerService.getCustomerDetails() ; 
       return res.status(200).send({message : customer.message , result : customer.result});
     }
     catch(error){
          return res.status(500).send({ message: "Internal  Server Error " + error.message });
     }
       
};

export const getCustomerDetailsById = async(req , res)=>{
    try{
    const customerId =  req.params.id ; 
    const customer = await customerService.getCustomerById(customerId ) ; 
    console.log(customer.result);
    if(customer.result.length == 0){
     return res.status(200).send({message : "Customer not found !"});
    }
    return res.status(200).send({message : customer.message , result : customer.result});
     }
     catch(error){
          return res.status(500).send({ message: error.message });
     }
};

export const placeOrderById = async (req, res) =>{
     try{
          const customerId = req.params.id; 
          console.log(customerId);
          const orderDetails = req.body; 
          console.log(orderDetails);
          const customer = await orderService.placeOrder(orderDetails , customerId) ;
          const orderId = await customer.orderId;
          const addItems = await orderService.NewItems(orderDetails.products , orderId);
          return res.status(201).send({ addOrderItemsStatus : addItems.message , orderStatus: {messsage : customer.message , orderId : customer.orderId} }) ; 
     }
     catch(error){
          console.log("Error in placeOrderById : " , error);
          return res.status(500).send({ message: "Internal Server Error" });
     }
};



export const removeCustomerById = async (req, res) => {
     try {
          const customerId = req.params.id;
          const customer = await customerService.deleteCustomerById(customerId);
         if(customer.result.affectedRows == 0){
          return res.status(404).send({message : "Customer not found - cannot delete !"})
         }
          return res.status(200).send({message : customer.message  });
     }
     catch (error) {
          console.error("Error in removeCustomerById:", error);
          return res.status(500).send({ message: "Internal Server Error" });
     }
} ;



export const updateCustomerById = async (req, res) => {
     try {
         const customerId = req.params.id ; 
     //     console.log(customerId);
         const customerDetails = req.body
     //     console.log(customerDetails);
 
         const updatedCustomer = await customerService.updateCustomer(customerId, customerDetails)
 
         return res.status(200).send({ message: updatedCustomer.message })
     } catch (error) {
          return res.status(500).send({ message: "Internal Server Error 89" });
     }
 }
 

 export const getAllOrdersById = async (req, res) => {
     try {
         const customerId = req.params.id ; 
          const orders = await customerService.getAllOrders(customerId);
 
         return res.status(200).send({ result : orders.result })
     } catch (error) {
          return res.status(500).send({ message: "Internal Server Error 89" });
     }
 }
