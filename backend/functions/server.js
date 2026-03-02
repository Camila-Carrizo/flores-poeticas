//import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';

import { connectDB } from '../config/db.js';
import flowersRouterImport from '../routes/flowers.js';
import uploadRouterImport from '../routes/upload.js';

const flowersRouter = flowersRouterImport.default || flowersRouterImport;
const uploadRouter = uploadRouterImport.default || uploadRouterImport;

const app = express();


app.use(cors());
app.use(express.json());

// 🔥 Netlify monta todo bajo /.netlify/functions/server

app.use('/api/flowers', flowersRouter);
app.use('/api/upload-image', uploadRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API Flores Poéticas' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


// 🔥 Manejo correcto de conexión en entorno serverless
let isConnected = false;


export const handler = async (event, context) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return serverless(app)(event, context);
};