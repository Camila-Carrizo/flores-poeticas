import express from 'express';
import cloudinary from '../config/cloudinary.js';
import { uploadImage } from '../config/multer.js';

const router = express.Router();

const FIELD_NAME = 'image';

const handleMulter = (req, res, next) => {
  uploadImage.single(FIELD_NAME)(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'La imagen es demasiado grande. Máximo 5 MB.' });
      }
      return res.status(400).json({ error: err.message || 'Error al procesar el archivo.' });
    }
    next();
  });
};

router.post('/', handleMulter, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se envió ninguna imagen.' });
  }

  const { CLOUDINARY_CLOUD_NAME } = process.env;
  if (!CLOUDINARY_CLOUD_NAME) {
    return res.status(503).json({ error: 'Servicio de imágenes no configurado.' });
  }

  try {
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'flores-poeticas',
      resource_type: 'image',
    });

    res.json({ imageUrl: result.secure_url });
  } catch (err) {
    console.error('Error subiendo a Cloudinary:', err);
    res.status(500).json({
      error: err.message || 'Error al subir la imagen. Intentá de nuevo.',
    });
  }
});

export default router;
