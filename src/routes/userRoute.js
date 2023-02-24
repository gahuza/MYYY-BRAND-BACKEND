import express from 'express';
import userController from '../controllers/userController.js';
import { UpdateOne } from '../controllers/userController.js';
import { auth, userRole } from '../middleware/auth.js';

const route = express.Router();

route.post('/signup', userController.postOne);
route.post('/signin/user', userController.post);
// route.get('/signin/upget', auth, userController.findAll);
route.patch('/update/:id', auth, UpdateOne);
route.delete('/delete/:id', auth, userRole('admin'), userController.deleteOne);

export default route;
// import  express  from "express";
// import { login  , register, finduser} from "../controllers/userController.js";
// import { body } from "express-validator";
// import { validationResultExpress } from "../middleware/validationResultExpress.js";

// const autRouter= express.Router();

// autRouter.post('/register',[
//     body('email',"Unformatted email").isEmail().normalizeEmail().trim(),
//     body('username','require more characters').trim().isLength({ min: 6}),
//     body('password','require more characters').trim().isLength({ min: 6}),
//     body('password','password incorrect').trim().isLength({ min: 6}).custom((value,{req})=>{
//         if(value !== req.body.repassword){
//    throw new Error('password dismatches');
//         }
//         return value;
//     }),
// ],
// validationResultExpress,
// register);

// autRouter.get('/register',finduser)
// autRouter.post('/login',[
//     body('email',"Unformatted email").isEmail().normalizeEmail().trim(),
  
//     body('password','require more characters').trim().isLength({ min: 6}),

// ],login )


// // autRouter.delete('/query/:id',deletequery)
//  export default autRouter;