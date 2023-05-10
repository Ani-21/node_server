import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

export default mongoose.model("User", userSchema);
