const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'mi_secreto_superseguro';

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username !== 'admin' || password !== 'password123') {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
