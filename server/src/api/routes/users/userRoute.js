import express from "express" ;

const router = express.Router() ; 

import * as userController from "../../users/controllers/userController.js"; 

// import { checkToken } from "../../middlewares/auth/tokenValidation.js";

router.get('/' ,  userController.getAllUsers );
router.post('/login' ,    userController.login );


export default router ; 

