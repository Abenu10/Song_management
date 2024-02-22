const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('./../../models/Users');

// const User = require('../..model/Users');

// @router POST api/users
// @desc Register router
// @access Public

// POST /api/users: register a new use
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({min: 6}),
  ],
  async (req, res) => {
    // req.body is the object that is going to be sent to this route
    // but we need to initialize the middleware for the body parser in order to use it

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;
    try {
      // See if user exists
      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
      }
      // TODO: Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      // TODO: creates an instance of the user, we need to save it to the database
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      // create a salt , we gonna need a promise from bcrypt.genSalt
      const salt = await bcrypt.genSalt(10);
      // hash the password
      user.password = await bcrypt.hash(password, salt);

      // save the user to the database
      await user.save();

      // Return jsonwebtoken
      // TODO:create payload
      // const payload = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // jwt.sign(
      //   payload,
      //   process.env.JWT_SECRET,
      //   {expiresIn: 360000},
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({token});
      //   }
      // );

      const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      // res.cookie('token', token, {httpOnly: true, sameSite: 'strict'});
      res.status(200).json({token, message: 'User authenticated', user: user});
      // res.send('User registered ');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);
// TODO: delete a user
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
});

module.exports = router;
