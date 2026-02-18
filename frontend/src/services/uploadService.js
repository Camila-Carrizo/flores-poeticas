import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Sube un archivo de imagen al backend; el backend la sube a Cloudinary
 * y devuelve la URL pública. Las claves de Cloudinary solo viven en el backend.
 */
export async function uploadImageFile(file) {
  const formData = new FormData();
  formData.append('image', file);

  const { data } = await axios.post(`${API_BASE}/upload-image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return data.imageUrl;
}
