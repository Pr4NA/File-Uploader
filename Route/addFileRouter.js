const { Router } = require("express");
const addFileRouter = Router();
const multer = require("multer") ;
const prisma = require("../DB/db.config") ;
const fs = require('fs');

const {AddFileget, AddFilepost} = require('../Controller/addFile') ;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./uploads") ;
    },
    filename: function (req, file, cb) {
      console.log("Uploaded file info:", file);
      return cb(null, `${Date.now()}-${file.originalname}`) ;
    }
})

const upload = multer({ storage }) ;

addFileRouter.get("/:folderId/addFile",AddFileget) ;
addFileRouter.post("/:folderId/addFile", upload.single("file_"),  AddFilepost) ;

addFileRouter.post("/:folderId/deleteFile/:fileId", async (req, res) => {
    try {
      const { folderId, fileId } = req.params;
  
      // Find the file from the database
      const file = await prisma.file.findUnique({
        where: { id: parseInt(fileId) },
      });
  
      if (!file) {
        return res.status(404).send("File not found in the database.");
      }
  
      // Delete the file entry from the database
      await prisma.file.delete({
        where: { id: parseInt(fileId) },
      });
  
      // Construct the correct file path
      // const filePath = path.join(__dirname, '../uploads', file.fileUrl.replace('/uploads', ''));
  
      // console.log('Attempting to delete file at:', filePath);
  
      // // Check if the file exists
      // fs.promises.access(filePath, fs.constants.F_OK) // Check if file exists
      //   .then(() => {
      //     // File exists, proceed to delete it
      //     fs.promises.unlink(filePath)  // Deletes the file from the local system
      //       .then(() => {
      //         console.log("File deleted successfully.");
      //         res.redirect(`/folder/${folderId}`);  // Redirect to the folder page
      //       })
      //       .catch(err => {
      //         console.error("Error deleting file:", err);
      //         res.status(500).send("Error deleting the file.");
      //       });
      //   })
      //   .catch(err => {
      //     console.error("File not found in the filesystem:", err);
      //     res.status(404).send("File not found in the filesystem.");
      //   });
    } catch (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Error deleting the file.");
    }
});

module.exports = addFileRouter ;