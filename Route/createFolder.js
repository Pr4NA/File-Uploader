const { Router } = require("express");
const createFolderRouter = Router();

const {createFolderget, createFolderpost} = require('../Controller/createFolder') ;

createFolderRouter.get("/", createFolderget) ;
createFolderRouter.post("/", createFolderpost) ;

module.exports = createFolderRouter ;