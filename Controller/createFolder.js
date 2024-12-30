const prisma = require("../DB/db.config");

const createFolderget = (req, res) => {
  res.render('createFolder') ;
};

const createFolderpost = async (req, res) => {
    try {
      const { title } = req.body;
      const userId = req.user.id;
  
      const folder = await prisma.folder.create({
        data: {
          title,
          user: {
            connect: { id: userId },
          },
        },
      });
      console.log("folder created successfully") ;
      res.redirect("/") ;
    } catch (error) {
      console.error('Error creating folder:', error);
      res.status(500).send('Internal Server Error');
    }
};
  
const listFolders = async (userId) => {
    try {
      const folders = await prisma.folder.findMany({
        where: { userId },
        include: { files: true },
      });
  
      return folders;
    } catch (error) {
      console.error('Error fetching folders:', error);
      throw new Error('Internal Server Error');
    }
  };
  

module.exports = {
  createFolderget,
  createFolderpost,
  listFolders,
};
