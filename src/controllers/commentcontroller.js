// import   comments   from "../models/commentmod.js";
// export const createcomm = async(req,res) =>{
//  try {
  
//     const comment = new comments(req.body);
//     await comment.save();
//     return res.status(201).json({ok:'commented well'})
//     // comment = new comments({email, comment});
   

//  } catch (error) {
//     console.log(error);
   
//  }
// }
// export const getAllComments = async(req,res) =>{
//     const comment = await comments.find();
//     res.send(comment);
//   }
// export const getSingleCommentById = async(req,res) =>{
//     const comment = await comments.findById({_id: req.params.id});
//     res.send(comment);
//   }
 
//   export const deleteSingleCommentById = async (req, res) => {
//     try {
//         const comment = await comments.deleteOne({ _id: req.params.id });
//       res.status(207).send({ok:'delete success'});
//     } catch {
//       res.status(406);
//       res.send({ error: "comment doesn't exist!" });
//     }
//   }
