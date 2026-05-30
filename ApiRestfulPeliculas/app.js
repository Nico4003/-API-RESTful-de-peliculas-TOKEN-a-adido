const express = require('express');
const logger = require('./middleware/logger');
const validarToken = require('./middleware/validarToken');
const peliculasRouter = require('./routes/peliculas.routes');
const loginRouter = require('./routes/login.routes');
const { sequelize } = require('./modules/database');

const app = express();

app.use(express.json());
app.use(logger);
app.use('/login', loginRouter);
app.use('/peliculas', validarToken, peliculasRouter);

app.get('/', (req, res) => {
  res.json({
    api: 'API RESTful de Películas',
    estado: 'online',
    endpoints: [
      '/login',
      '/peliculas'
    ]
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Error al inicializar la base de datos:', error);
});
