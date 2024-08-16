const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (token == null) return res.sendStatus(401); // Si aucun token n'est fourni
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide ou expiré
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;



