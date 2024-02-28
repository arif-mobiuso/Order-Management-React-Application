import express from "express" ;
import * as orderController  from "../../orders/controllers/orderController.js" ;

const router = express.Router() ; 

// Validation imports
import { validation } from "../../middlewares/validationMiddleware.js";
import orderHeaderSchema from "../../validations/placeOrderValidation.js"
import orderItemsSchema from "../../validations/orderItemsValidation.js";




// add order_items in a particular order



router.get('/:id/headers', validation(orderHeaderSchema),  orderController.getOrderHeaderById) ;
router.get('/:id/items', orderController.getOrderItemsById) ;
router.post('/:id/items' , validation(orderItemsSchema) , orderController.addNewItemsById) ; 


// add order header 
router.post("/:id", orderController.newOrder);



export default router ; 

