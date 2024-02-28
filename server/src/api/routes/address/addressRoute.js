import express  from "express";

import * as addressController from "../../address/controllers/addressController.js"

const router = express.Router() ; 

router.get('/' , addressController.getAllAddresses)
router.get('/:id' , addressController.getAddressById)



export default router ; 
