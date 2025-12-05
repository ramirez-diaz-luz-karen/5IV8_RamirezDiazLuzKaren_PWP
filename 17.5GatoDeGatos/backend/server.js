import express from 'express';
import path from 'path';
import partidasRoutes from './routes/partidasRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir frontend estático (ajusta la ruta si mueves carpetas)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.set('views engine', 'ejs');
app.set('public', path.join(__dirname, '../frontend', 'public'));

//vamos a consumir las rutas
app.use('/', partidasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});