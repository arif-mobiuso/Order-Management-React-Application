

import *  as orderService from "../services/orderService.js" ;





export const addNewItemsById =  async (req, res)  => {
    try{
    const orderId = req.params.id ; 
        const orderDetails = req.body; 
        console.log(orderDetails.products);
    const order  = await orderService.NewItems(orderDetails.products , orderId ) ;
    return res.status(201).send({message : order.message}) ; 
    }
    catch(error){
         console.error("Error in addNewItemsById:", error);
         return res.status(500).send({ message: "Internal Server Error" });
    }
};



export const getOrderHeaderById = async(req, res) =>{
    try{
        const orderId = req.params.id ;
        const order = await orderService.orderHeaderById(orderId);
        if(order.result.length == 0){
            return res.status(200).send({message : "Header Details not found !"})
        }
        return res.status(200).send({message : order.message , result : order.result});
    }
    catch(error){
        console.log("Error in getOrderHeaderById : " , error );
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


export const getOrderItemsById = async(req, res) =>{
    try{
        const orderId = req.params.id ;
        const order = await orderService.orderItemsById(orderId);
        if(order.result.length == 0){
            return res.status(404).send({message : "Order Items Details not found !"})
        }
        return res.status(200).send({message : order.message , result : order.result});
    }
    catch(error){
        console.log("Error in getOrderItemsById : " , error );
        return res.status(500).send({ message: "Internal Server Error" });
    }
}


export const newOrder = async(req, res)=>{
    try{
        const orderDetails = req.body ;
        const cutomerId  = req.params.id ; 
        const order = await orderService.newOrderService(orderDetails , cutomerId  );
        res.status(201).send({message : order.message , orderId : order.orderId}); 
    }catch(error){
        res.status(500).send({message : error.message})       
    }
}