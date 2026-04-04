import formidable from "formidable";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    filename: (name, ext, part) => {
      return part.originalFilename;
    },
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }

    const file = files.file?.[0] || files.file;

    if (!file) {
      return res.status(400).json({ error: "No file received" });
    }

    return res.status(200).json({
      message: "File uploaded successfully!",
      filename: file.originalFilename,
      size: file.size,
      type: file.mimetype,
    });
  });
}