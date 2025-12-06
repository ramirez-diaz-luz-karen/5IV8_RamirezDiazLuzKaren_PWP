import express from 'express';
import path from 'path';
import partidasRoutes from './routes/partidasRouters.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use('/api', partidasRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.set("view engine", "ejs");
