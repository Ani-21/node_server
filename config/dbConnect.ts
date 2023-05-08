import mongoose, { ConnectOptions } from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
  } catch (err) {
    throw new Error("Что-то пошло не так");
  }
};
