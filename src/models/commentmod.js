
import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  },
  {
    timestamps: true,
  },
);

export { schema as commentSchema };
// import  mongoose from "mongoose";

// const schema = mongoose.Schema;

// const commentSchema = new schema(
//   {
//     comment: {
//       type: String,
//       required: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     blog: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Blog',
//     },
//   },
//   { timestamps: true 
// });

// const comments = mongoose.model("comments", commentSchema);

// export default comments;