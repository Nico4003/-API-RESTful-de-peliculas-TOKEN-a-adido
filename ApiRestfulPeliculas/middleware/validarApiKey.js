function validarApiKey(req, res, next) {
  const apiKey = req.header('x-api-key') || req.query.apiKey;
  const validKey = process.env.API_KEY || '12345';

  if (!apiKey || apiKey !== validKey) {
    return res.status(401).json({ error: 'API key inválida o ausente' });
  }

  next();
}

module.exports = validarApiKey;
