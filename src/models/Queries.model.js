import  mongoose from "mongoose";

const schema = mongoose.Schema;

const querySchema = new schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true 
});

const Query = mongoose.model("Query", querySchema);

export default Query;