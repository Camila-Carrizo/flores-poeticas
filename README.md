# Flores Poéticas — Herbario

Web tipo herbario poético: listado de flores con nombre, imagen y significado poético, con ABM completo desde un panel administrador.

## Estructura

- **frontend**: React + Vite + Ant Design + Axios + React Router
- **backend**: Node.js + Express + MongoDB (Mongoose)

## Requisitos

- Node.js 18+
- MongoDB en ejecución (local o remoto)

## Backend

```bash
cd backend
cp .env.example .env   # opcional: editar PORT y MONGODB_URI
npm install
npm run dev
```

API en `http://localhost:5000`.

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/flowers | Listar flores |
| GET | /api/flowers/:id | Obtener una flor |
| POST | /api/flowers | Crear flor |
| PUT | /api/flowers/:id | Actualizar flor |
| DELETE | /api/flowers/:id | Eliminar flor |

## Frontend

```bash
cd frontend
npm install
npm run dev
```

App en `http://localhost:5173`. El proxy de Vite redirige `/api` al backend (puerto 5000).

## Variables de entorno

**Backend** (`.env`):

- `PORT`: puerto del servidor (default 5000)
- `MONGODB_URI`: URI de MongoDB (default `mongodb://localhost:27017/flores-poeticas`)

**Frontend** (opcional):

- `VITE_API_URL`: base URL de la API (por defecto se usa el proxy `/api`)

## Modelo Flower

- `name` (String)
- `image` (String, URL)
- `poeticMeaning` (String)
- `createdAt` (Date, automático)
