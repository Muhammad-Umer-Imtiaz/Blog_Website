import express from "express"
import { adminLogin, adminLogout, checkAuth, getAllBlogsAdmin, getDashboard } from "../controller/admin.Controller";
import { isAuthenticated } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";
import { approveCommentById, deleteCommentById, getAllComment } from "../controller/comment.Controller";


const router = express.Router();

router.post('/login', adminLogin);
router.get('/logout',asyncHandler(isAuthenticated),adminLogout )
router.get('/check-auth', asyncHandler(isAuthenticated),checkAuth);
router.get('/blogs',asyncHandler(isAuthenticated),getAllBlogsAdmin)
router.get('/comments',asyncHandler(isAuthenticated),getAllComment)
router.post('/delete-comment',asyncHandler(isAuthenticated),deleteCommentById)
router.post('/approve-comment',asyncHandler(isAuthenticated),approveCommentById)
router.get('/dashboard',asyncHandler(isAuthenticated),getDashboard)

export default router