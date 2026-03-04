import express from 'express';
import FlowerImport from '../models/Flower.js';

const Flower = FlowerImport.default || FlowerImport;

const router = express.Router();

// GET /api/flowers - Listar todas las flores
router.get('/', async (req, res) => {
  try {
    const flowers = await Flower.find().sort({ createdAt: -1 }).populate('color');
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/flowers/:id - Obtener una flor por ID
router.get('/:id', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id).populate('color');
    if (!flower) {
      return res.status(404).json({ error: 'Flor no encontrada' });
    }
    res.json(flower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/flowers - Crear una flor
router.post('/', async (req, res) => {
  try {
    const flower = new Flower(req.body);
    await flower.save();
    res.status(201).json(flower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/flowers/:id - Actualizar una flor
router.put('/:id', async (req, res) => {
  try {
    const flower = await Flower.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!flower) {
      return res.status(404).json({ error: 'Flor no encontrada' });
    }
    res.json(flower);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/flowers/:id - Eliminar una flor
router.delete('/:id', async (req, res) => {
  try {
    const flower = await Flower.findByIdAndDelete(req.params.id);
    if (!flower) {
      return res.status(404).json({ error: 'Flor no encontrada' });
    }
    res.json({ message: 'Flor eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
