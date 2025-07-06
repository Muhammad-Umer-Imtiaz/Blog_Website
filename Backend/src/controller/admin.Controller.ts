import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Blog } from '../model/blog.Model';
import { Comment } from '../model/comment.Model';

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      res.status(401).json({ success:false,message: 'incorrect Email or password' });
      return;
    }

    // Generate token
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    // Send cookie with response
    res
      .status(200)
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
      })
      .json({ message: 'Login successful', success:true,token });
  } catch (error) {
    res.status(500).json({success:false, message: 'Internal server error' });
  }
};

export const adminLogout = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        maxAge: 0,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAllBlogsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
export const getDashboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    res.status(200).json({ success: true, dashboard: dashboardData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since isAuthenticated already verifies the token, we can assume it's valid here
    res.status(200).json({ success: true, message: "Authenticated" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication check failed" });
  }
};