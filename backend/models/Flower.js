import mongoose from 'mongoose';

const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  poeticMeaning: {
    type: String,
    required: [true, 'El significado poético es obligatorio'],
    trim: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Flower', flowerSchema);
