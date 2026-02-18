import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import flowersRouter from './routes/flowers.js';
import uploadRouter from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/flowers', flowersRouter);
app.use('/api/upload-image', uploadRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API Flores Poéticas' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
