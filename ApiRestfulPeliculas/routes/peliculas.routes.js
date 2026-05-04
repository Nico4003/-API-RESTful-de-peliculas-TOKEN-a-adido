const express = require('express');
const router = express.Router();
const peliculaService = require('../services/pelicula.service');

router.get('/', async (req, res) => {
  const peliculas = await peliculaService.obtenerTodas();
  res.json(peliculas);
});

router.get('/:id', async (req, res) => {
  const pelicula = await peliculaService.obtenerPorId(req.params.id);
  if (!pelicula) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }
  res.json(pelicula);
});

router.post('/', async (req, res) => {
  try {
    const nuevaPelicula = await peliculaService.crear(req.body);
    res.status(201).json(nuevaPelicula);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos para crear la película' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const peliculaActualizada = await peliculaService.actualizar(req.params.id, req.body);
    if (!peliculaActualizada) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    res.json(peliculaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos para actualizar la película' });
  }
});

router.delete('/:id', async (req, res) => {
  const eliminado = await peliculaService.eliminar(req.params.id);
  if (!eliminado) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }
  res.status(204).send();
});

module.exports = router;
