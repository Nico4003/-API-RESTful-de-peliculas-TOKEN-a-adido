const Pelicula = require('../modules/pelicula.module');

async function obtenerTodas() {
  return Pelicula.findAll();
}

async function obtenerPorId(id) {
  return Pelicula.findByPk(id);
}

async function crear(data) {
  return Pelicula.create(data);
}

async function actualizar(id, data) {
  const pelicula = await Pelicula.findByPk(id);
  if (!pelicula) {
    return null;
  }

  return pelicula.update(data);
}

async function eliminar(id) {
  const pelicula = await Pelicula.findByPk(id);
  if (!pelicula) {
    return false;
  }

  await pelicula.destroy();
  return true;
}

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};
