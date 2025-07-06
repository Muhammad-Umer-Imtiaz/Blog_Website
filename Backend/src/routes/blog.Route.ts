import express from "express";
import { addBlog, deleteBlogById, generateContent, getAllBlogs, getBlogById, togglePublish } from "../controller/blog.Controller";
import { isAuthenticated } from "../middleware/auth";
import upload from "../middleware/multer";
import { asyncHandler } from "../utils/asyncHandler";
import { getAllBlogsAdmin } from "../controller/admin.Controller";

const router = express.Router();

// Use /add to match your earlier Postman intent
router.post("/add", upload.single("image"), asyncHandler(isAuthenticated), addBlog);
// Wrap getAllBlogs with asyncHandler if it’s async
router.get("/all", asyncHandler(getAllBlogs));
router.get("/:id", getBlogById)
router.delete("/delete",asyncHandler(isAuthenticated),deleteBlogById)
router.post("/toggle-publish",asyncHandler(isAuthenticated),togglePublish)
router.get('/blogs',asyncHandler(isAuthenticated),getAllBlogsAdmin)
router.post('/generate',asyncHandler(isAuthenticated),generateContent)
export default router;
