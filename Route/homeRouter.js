const { Router } = require("express");
const homeRouter = Router();
const { folderDetailsController, homeController } = require("../Controller/home");

homeRouter.get("/",homeController) ;
homeRouter.get("/folder/:folderId", folderDetailsController) ;

module.exports = homeRouter ;