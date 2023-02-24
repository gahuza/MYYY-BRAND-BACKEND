
// import  Users    from '../models/userModel.js';

// const findOneUserService = async (email) => {
//   const findOneUserRequest = await Users.findOne({ email: email });
//   return findOneUserRequest;
// };

// const createNewUserService = async (username, email, password) => {
//   const createNewUserRequest = await new Users({
//     username: username,
//     email: email,
//     password: password,
//   });
//   await createNewUserRequest.save();
//   const response = {
//     username: createNewUserRequest.username,
//     email: createNewUserRequest.email,
//   };

//   return response;
// };

// const getAllUsersService = async () => {
//   const allUsersRequest = await Users.find();
//   return allUsersRequest;
// };

// export { findOneUserService, createNewUserService, getAllUsersService };