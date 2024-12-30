const { Router } = require("express");
const SignUpRouter = Router();

const {SignUpget, SignUppost, validateSignUp} = require('../Controller/sign-up') ;

SignUpRouter.get("/",SignUpget) ;
SignUpRouter.post("/", validateSignUp, SignUppost) ;

module.exports = SignUpRouter ;

