import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      maxLength: 60,
    },
    text: {
      type: String,
      required: true,
      maxLength: 500,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    parent: {
      type: String,
      default: "",
    },
    childs: {
      type: [String],
    }
  },
  { timestamps: true }
);


export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema)