const express = require('express');
const router = express.Router();

// @router GET api/profile
// @desc Test router
// @access Public

router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
