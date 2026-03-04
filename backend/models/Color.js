import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  hex: { type: String, required: true, trim: true },
});

export default mongoose.model('Color', colorSchema);
