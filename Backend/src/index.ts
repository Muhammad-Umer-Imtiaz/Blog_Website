import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/dbConnection";
import adminRoute from "./routes/admin.Route";
import blogRoute from "./routes/blog.Route";
import commentRoute from "./routes/comment.Route"
const app = express();

dotenv.config();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/admin", adminRoute);
app.use("/api/blog", blogRoute);
app.use("/api/comment", commentRoute);
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});