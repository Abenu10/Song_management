const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // // Get token from header
  // // const token = req.header('x-auth-token');
  // // get the token from the cookie instead,
  // const token = req.cookies.token;

  // // Check if not token
  // if (!token) {
  //   return res.status(401).json({msg: 'No token, authorization denied '});
  // }
  // // Verify token
  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   req.user = {_id: decoded.userId};
  //   next();
  //   // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   // if (err) return res.sendStatus(403);
  //   // req.user = user;
  //   // next();
  // } catch (err) {
  //   res.status(401).json({msg: 'Token is not valid'});
  // }
  if (!req.headers.authorization) {
    return res.status(403).json({error: 'No authorization header provided'});
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(403).json({error: 'No token provided'});

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({
        error: 'Failed to authenticate token',
        message: 'Token is invalid',
      });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.userId;
    next();
  });
};
