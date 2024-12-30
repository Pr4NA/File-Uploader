const prisma = require("../DB/db.config");

async function AddFileget(req, res) {
    try {
      const folderId = parseInt(req.params.folderId, 10);
  
      // Check if folderId is a valid number
      if (isNaN(folderId)) {
        return res.status(400).send("Invalid folder ID");
      }
  
      res.render("addFile", {folderId : folderId });
    } catch (err) {
      console.error("Error rendering addFile page:", err);
      res.status(400).send("Error rendering file upload form.");
    }
  }
  
  async function AddFilepost(req, res) {
    try {
      const folderId = parseInt(req.params.folderId, 10);
  
      // Check if folderId is valid
      if (isNaN(folderId)) {
        return res.status(400).send("Invalid folder ID");
      }
  
      const { title } = req.body;
      const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;  // Make sure to check if the file is uploaded
  
      if (!fileUrl) {
        return res.status(400).send("No file uploaded");
      }
  
      await prisma.file.create({
        data: {
          title,
          fileUrl,
          folder: {
            connect: { id: folderId },
          },
        },
      });
  
      console.log("File created successfully");
      res.redirect(`/folder/${folderId}`);
    } catch (err) {
      console.error("Error uploading file:", err);
      res.status(400).send("Error uploading file.");
    }
  }
  
module.exports = { AddFileget, AddFilepost };
