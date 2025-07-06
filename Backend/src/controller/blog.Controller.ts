import { Request, Response } from "express";
import fs from "fs/promises";
import imagekit from "../config/imageKit";
import { Blog } from "../model/blog.Model";
import { Comment } from "../model/comment.Model";
import main from "../config/gemini";

export const addBlog = async (req: Request, res: Response): Promise<void> => {
  try {
   

    const blogData = JSON.parse(req.body.blog); // ✅ Correct
    const { title, subTitle, description, category, isPublished } = blogData; // ✅ Use blogData, not req.body

    const image = req.file;

    if (!title || !description || !category || !image) {
      res.status(400).json({ success: false, message: "Missing required fields" });
      return;
    }

    const fileBuffer = await fs.readFile(image.path);
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: image.filename,
      folder: "blogImages",
    });

    const optimizedImage = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image: optimizedImage,
      isPublished,
    });

    await fs.unlink(image.path).catch((err) => console.error("Failed to delete temp file:", err));

    res.status(201).json({ success: true, message: "Blog created successfully" });

  } catch (error: any) {
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};



export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0) {
      res.status(404).json({
        success: false,
        message: 'No blogs found',
        blogs: [],
      });
      return; // ❗ Important: stop execution
    }

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error: any) {

    // ❗ Always return after sending response
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};


export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ success: false, message: "Blog not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Found", blog });
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

export const togglePublish = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({ message: "Blog not found", success: false });
      return;
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.status(200).json({ message: "Blog status updated", success: true, isPublished: blog.isPublished });
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};
// Delete Blog by ID
export const deleteBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.body;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      res.status(404).json({ message: "Blog not found", success: false });
      return;
    }
    await Comment.deleteMany({ blog: id })

    res.status(200).json({ message: "Deleted Successfully", success: true });
  } catch (error: any) {
    res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

export const generateContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body;
    const content = await main(prompt + 'Generate a blog for this topic in simple text format and Make sure blog length is more than 1500 word')
    res.status(200).json({ success: true, content })
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server issue" })
  }
}