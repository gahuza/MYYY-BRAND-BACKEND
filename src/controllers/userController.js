import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import   dotenv  from "dotenv"

dotenv.config()


const signInToken = (id) => {};
class userController {
    /* istanbul ignore next*/
  static async findAll(req, res) {
    try {
      const users = await userModel.find();

      res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (error) {
        /* istanbul ignore next*/
      res.status(404).json({
        status: 'error',
        error: 'Not user found',
      });
    }
  }
  static async postOne(req, res) {
   
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const user = await userModel.findOne({ email });
  
      if (user) {
        return res.status(409).json({
          status: 'fail',
          message: 'Email in use',
        });
      }
  
  /* istanbul ignore next*/
      const newUser = await userModel.create(req.body);
      const token = await jwt.sign(
        { id: newUser._id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.JWT_EXPERISIN,
        }
      );

      res.status(404).json({
        status: 'success',
        users: 'Signup success and login',
        token,
        data: {
          newUser,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error,
      });
    }
  }
  static async post(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        /* istanbul ignore next*/
      return res.status(404).json({
        status: '404',
        success: false,
        message: 'Email and password are required',
      });
    }
    const user = await userModel.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
        /* istanbul ignore next*/  /* istanbul ignore next*/
      return res.status(401).json({
        status: '401',
        success: false,
        message: 'Incorrect email or password',
      });
    }

   
    try {
      const token = await jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPERISIN,
      });
      res.status(201).json({
        status: 'success',
        users: 'SignIn success and login',
        LoggedInAs: {
          user,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: error,
      });
    }
  }

  static async deleteOne(req, res) {
   await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found',
      });
    }
    try {
      await userModel.findOneAndDelete({ _id: req.params.id });
      res.status(200).json({
        status: 'success',
        users: 'Delete user successfully done',
      });
    } catch (error) {
      res.status(204).json({
        status: 'error',
        error: 'Delete failed',
      });
    }
  }
}
  export const UpdateOne = async(req, res)=> {
    const { password } = req.body;

    if (password) {
      return res.status(400).json({
        status: 'fail',
        message: 'this is not the route for updating password is for others',
      });
    }
 const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    try {
      res.status(200).json({
        status: 'success',
        message: 'Update success done ',
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error: error,
      });
    }
  }

export const getAllUsers = async(req,res)=>{
  const users = await userModel.find();
  res.status(200).send(users);
}
export const getAllUsersById = async(req,res) =>{
try {
  const userss = await userModel.findById({_id: req.params.id});
  res.status(200).send(userss);
} catch (error) {
  res.status(500);
    res.send({ error: "user doesn't exist!" });
}
}
export const deleteSingleUserById = async (req, res) => {
  try {
      await userModel.deleteOne({ _id: req.params.id });
    res.status(207).send({ok:'delete success'});
  } catch (error) {
    res.status(406);
    res.send({ error: "user doesn't exist!" });
  }
}


export default userController;

// import { Users } from "../models/userModel.js";
// import  Jwt  from "jsonwebtoken";
// export const register = async(req,res) =>{
//  const { username, email, password } =req.body;
//  try {
//     let user= await Users.findOne({ email });

//     if (user) throw {code:11000};

//     user = new Users({username, email, password});
//     await user.save();
//     //jwt token
//     return res.status(201).json({ok:'registered'})

//  } catch (error) {
//     console.log(error);
//     if(error.code ===11000){
//         return res.status(400).json({error:'Email in use'}) ;
//     }
//  }
// }
// export const login = async(req,res) =>{
// try {
//     const { email, password } =req.body;
//     let user= await Users.findOne({ email });
//     if(!user)
//     return res.status(403).json({ok:'user not exist'})

//     const requestpassword = await user.comparePassword(password);
//     if(!requestpassword){
//         return res.status(403).json({ok:'incorrect password'})
//     }
//     //jwt token
//     res.json({ok:'login'});
// } catch (error) {
//     console.log(error);
// }

  
// }
// export const finduser = async(req,res) =>{
//     const users = await Users.find();
//     res.send(users);
//   }