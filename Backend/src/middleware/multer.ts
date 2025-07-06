import multer from "multer";
import path from "path";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../uploads");
    console.log("Checking upload path:", uploadPath);
    try {
      await fs.access(uploadPath);
      console.log("Path exists:", uploadPath);
    } catch (err) {
      console.log("Creating directory:", uploadPath);
      await fs.mkdir(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
