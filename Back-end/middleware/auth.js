const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  // const token = req.header('x-auth-token');
  // get the token from the cookie instead,
  const token = req.cookies.token;

  // Check if not token
  if (!token) {
    return res.status(401).json({msg: 'No token, authorization denied '});
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {_id: decoded.userId};
    next();
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // if (err) return res.sendStatus(403);
    // req.user = user;
    // next();
  } catch (err) {
    res.status(401).json({msg: 'Token is not valid'});
  }
};
