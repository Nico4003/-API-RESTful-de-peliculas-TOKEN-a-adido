const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mi_secreto_superseguro';

function validarToken(req, res, next) {
  const authHeader = req.header('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token JWT ausente o inválido' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    req.user = payload;
    next();
  });
}

module.exports = validarToken;
