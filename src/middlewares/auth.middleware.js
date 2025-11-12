const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({error:'Token required'});
  const [, token] = header.split(' ');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch(e){
    return res.status(401).json({error:'Invalid token'});
  }
}

module.exports = { authMiddleware };
