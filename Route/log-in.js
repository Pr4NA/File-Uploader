const { Router } = require("express");
const LogInRouter = Router();

const {LogInget, LogInpost} = require('../Controller/log-in') ;

LogInRouter.get("/",LogInget) ;
LogInRouter.post("/",LogInpost) ;

module.exports = LogInRouter ;

