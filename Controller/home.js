const {listFolders} = require("./createFolder") ;
const prisma = require("../DB/db.config") ;

async function homeController(req, res) {
  try {
    let folders ;
    if(req.user){
        folders = await listFolders(req.user.id) ;
    }
    res.render('home', {user : req.user, folders: folders}) ;
  } catch (err) {
    console.error("Error fetching messages in home.js:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

async function folderDetailsController(req, res) {
  try {
    const folderId = parseInt(req.params.folderId, 10);

    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: { files: true },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    res.render("folderDetails", { folder });
  } catch (err) {
    console.error("Error fetching folder details:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

module.exports = { homeController, folderDetailsController } ;
