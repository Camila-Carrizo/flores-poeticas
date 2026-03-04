import express from 'express';
import ColorImport from '../models/Color.js';
import FlowerImport from '../models/Flower.js';

const Color = ColorImport.default || ColorImport;
const Flower = FlowerImport.default || FlowerImport;

const router = express.Router();

// GET /api/colors
router.get('/', async (req, res) => {
  try {
    const colors = await Color.find().sort({ name: 1 });
    res.json(colors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/colors
router.post('/', async (req, res) => {
  try {
    const color = new Color(req.body);
    await color.save();
    res.status(201).json(color);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/colors/:id
router.put('/:id', async (req, res) => {
  try {
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!color) {
      return res.status(404).json({ error: 'Color no encontrado' });
    }
    res.json(color);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/colors/:id
router.delete('/:id', async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ error: 'Color no encontrado' });
    }
    await Flower.updateMany(
      { color: req.params.id },
      { $set: { color: null } }
    );
    res.json({ message: 'Color eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
