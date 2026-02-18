import mongoose from 'mongoose';

const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    trim: true,
  },
  poeticMeaning: {
    type: String,
    required: [true, 'El significado poético es obligatorio'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Flower', flowerSchema);
