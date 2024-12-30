require("dotenv").config() ;
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./passport-config");
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const prisma = require('./DB/db.config') ;

const SignUpRouter = require("./Route/sign-up");
const LogInRouter = require("./Route/log-in");
const homeRouter = require("./Route/homeRouter");
const addFileRouter = require("./Route/addFileRouter") ;
const createFolderRouter = require("./Route/createFolder");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(
    session({
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
      secret: 'dogs',
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        debug: true, // Enable debugging
      }),      
    })
);
  
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use("/", homeRouter);
app.use("/createFolder", createFolderRouter) ;
app.use("/folder", addFileRouter) ;
app.use("/sign-up", SignUpRouter);
app.use("/log-in", LogInRouter);
app.get("/log-out", (req, res ) => {
    req.logout((err) => {
      if (err) {
        res.status(400).send('Error in logging out');
      }
      res.redirect("/");
    });
});

app.listen(process.env.PORT || 3000, () => console.log("App listening on port 3000!"));