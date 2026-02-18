import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    console.error('→ ¿MongoDB está corriendo? Si usás Atlas, revisá MONGODB_URI en .env');
    // No hacemos exit(1) para que el servidor arranque igual; las rutas que usen DB fallarán hasta que conectes
  }
};
