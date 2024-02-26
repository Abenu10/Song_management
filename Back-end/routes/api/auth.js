const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

// const User = require('../../models/User');
// const User = require('../../models/Users')

// @router GET api/auth
// @desc Test router
// @access Public

// GET /api/auth: get the user's data
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// TODO: @router POST api/auth
// @desc Authenticate user & get token or LOgin
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // req.body is the object that is going to be sent to this route
    // but we need to initialize the middleware for the body parser in order to use it

    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
      // See if user exists
      let user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
      }

      // use bcrypt to compare the password with the one in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
      }

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

// log out user
// router.get('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.status(200).send({message: 'User logged out'});
// });

// log out user
router.get('/logout', (req, res) => {
  // res.clearCookie('token', {
  //   expires: new Date(Date.now() - 1000),
  //   httpOnly: true,
  //   sameSite: 'strict',

  // });
  res.status(200).send({message: 'User logged out'});
});

// router.post('/refresh-token', async (req, res) => {
//   // Get the refresh token from the request
//   const refreshToken = req.body.refreshToken;

//   // Check if the refresh token is valid
//   if (!refreshToken) {
//     return res.status(403).json({ error: 'No refresh token provided' });
//   }

//   // Verify the refresh token
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid refresh token' });
//     }

//     // If the refresh token is valid, issue a new JWT
//     const newToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ token: newToken });
//   });
// });
router.get('/user/id', auth, (req, res) => {
  // Now req.userId contains the decoded token (user data)
  res.json({userId: req.userId});
});
module.exports = router;

// function to add two numbers
