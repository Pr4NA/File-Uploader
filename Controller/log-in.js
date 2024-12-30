const passport = require("../passport-config") ;

function LogInget(req, res ) {
    try {
      res.render("log-in");
    } catch (err) {
      res.status(404).send("Error") ; 
    }
}

function LogInpost (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed:", info.message);
      return res.redirect("/log-in");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Error logging in user:", err);
        return next(err);
      }
      console.log("Authenticated user:", user);
      res.redirect("/");
    });
  })(req, res, next);
} ;


module.exports = {LogInget, LogInpost} ;