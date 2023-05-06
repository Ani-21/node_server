import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  text: String,
  username: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("PostMessage", postSchema);
