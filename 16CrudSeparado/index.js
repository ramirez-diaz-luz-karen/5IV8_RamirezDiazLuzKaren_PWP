const express = require('express'); //servidor
const dotenv = require('dotenv'); //para el puntoend (donde tenemos las variables de entorno)
const cors = require('cors'); //middleware
const path = require('path'); //para tener el manejo de los directorios

//primero las configuraciones de las rutas
const cursosRouter = require('../routers/cursosRouters.js');

const app = express();

const db = require('../database/db.js');

//consfiguramos las vistas
app.set('view engine', 'ejs');
app.set('views', path.json(__dirname + '/views'));//formtto de intercambio

//configuro el middleware
app.use(express.json());
app.use(cors()); //para las rutas


//vamos a generar una vista estatica (html. Ej: Pagina de bienvenida)
app.use(express.static(path.join(__dirname, 'views')));//formato para detectar html

//necesito ver mi pagina de cursos
app.get('/vista/cursos-ejs',(req,res)=>{
    //redireccionar para consumir
    res.redirect('/vista/cursos-ejs');
});

//ruta de bienvenida
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'views','bienvenida.html'))
});

//vamos a renderizar la ruta de consulta
app.get('/vista/cursos-ejs', (req,res) => {
    const sql = ('SELECT * FROM cursos', (error, resultado) =>{
        if(error){
            console.error('Error al obtener los recursos: '+ error.message);
            res.status(500).send('Error al obtener los cursos');
            return res.render('cursos',{cursos:[]});
        }
        return res.render('cursos', {cursos: resultado});
    });
});

//usar las rutas
app.use('/cursos', cursosRouter); 