const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Conseguir el OTken dle Header
  const token = req.header('x-auth-token');

  //Checar si no es el token
  if (!token) {
    return res.status(401).json({ msg: 'No estas autorizado perro' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'El token no es valido' });
  }
};
