const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = require("../DB/db.config");

const validateSignUp = [
  body('username')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('ConfirmPassword')
    .custom((value, { req }) => value === req.body.password || 'Passwords must match'),
];

async function SignUpget(req, res, next) {
  try {
    res.render("sign-up", {
      errors: null,
      formData: {}
    });
  } catch (err) {
    res.status(400).send('Error found in signing up.')
  }
}

async function SignUppost(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('sign-up', {
      errors: errors,  
      formData: req.body
    });
  }

  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password : hashedPassword,
      },
    });

    res.redirect('/'); 
  } catch (err) {
    console.error("Error in sign-up:", err);
    res.status(400).send(err) ;
  }
}

module.exports = { SignUpget, SignUppost, validateSignUp };
