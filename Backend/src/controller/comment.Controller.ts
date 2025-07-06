import { Request, Response } from "express";
import { Comment } from "../model/comment.Model";

// Add a comment
export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blog, name, content } = req.body;

    if (!name || !content || !blog) {
      res.status(400).json({ message: "All fields are required", success: false });
      return;
    }

    await Comment.create({ blog, name, content });
    res.status(200).json({ message: "Comment added for review", success: true });

  } catch (error: any) {
    res.status(500).json({ message: "Internal server issue", success: false, error: error.message });
  }
};


// Get approved comments for a blog
export const getBlogComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      res.status(400).json({ message: "Blog ID is required", success: false });
      return;
    }

    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });

    res.status(200).json({ message: "Fetched all approved comments", success: true, comments });

  } catch (error: any) {
    res.status(500).json({ message: "Internal server issue", success: false, error: error.message });
  }
};
export const deleteCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Comment ID is required" });
      return;
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

export const approveCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Comment ID is required" });
      return;
    }

    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.status(200).json({ success: true, message: "Comment approved successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
export const getAllComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};