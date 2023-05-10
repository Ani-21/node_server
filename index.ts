require("dotenv").config();
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDB } from "./config/dbConnect";
import { corsOptions } from "./config/corsOptions";
import { credentials } from "./middleware/credentials";
import { verifyJWT } from "./middleware/verifyJWT";

const app = express();

connectDB();

app.use(credentials);

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

// app.use(verifyJWT);
app.use("/posts", require("./routes/api/posts"));
app.use("/users", require("./routes/api/users"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log("Server running on port:", process.env.PORT)
  );
});
