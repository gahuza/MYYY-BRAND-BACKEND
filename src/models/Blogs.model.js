import mongoose from 'mongoose';
import { commentSchema } from './commentmod.js';
import { likeSchema } from './likesModel.js';
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    comments: [commentSchema],
    likes: [likeSchema]

  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model('Blog', schema);
export default Blog;