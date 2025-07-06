import express from "express";
import { addComment, getAllComment, getBlogComment } from "../controller/comment.Controller";
import { asyncHandler } from "../utils/asyncHandler";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.post('/add-comment',addComment);
router.post("/comments",getBlogComment);
router.get('/all-comment',asyncHandler(isAuthenticated),getAllComment)


export default router;
