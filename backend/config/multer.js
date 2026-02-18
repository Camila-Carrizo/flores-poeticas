import multer from 'multer';

const MAX_SIZE_MB = 5;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIMES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Usá JPEG, PNG, GIF o WebP.'), false);
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_BYTES },
});
