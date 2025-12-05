import express from 'express';
import path from 'path';
//aqui nosotros tenemos que agregar las rutas que se van a consumir
import productroutes from './models/productroutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const _dirname = path.resolve(); //obtener el directorio actual

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set(express.static(path.join(__dirname,'../Fronted', 'public')));
app.set('views engine', 'ejs' );
app.set('public', path.join(_dirname,'../Fronted', 'public'));

//vamos a consumir las rutas
app.use('/', productroutes);

app.listen(PORT, () =>{
    console.log(`Servicor corriento en el puerto ${PORT}`);
});
