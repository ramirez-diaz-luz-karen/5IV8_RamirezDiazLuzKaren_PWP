const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

require('dotenv').config({path: './.env'});

const app = express();
const port = 3000;

//configuracion de mysql
const bd = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kasanajisa1.',
    database: 'bitacora_inspecciones'
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos: ' + error);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

//tenemos que configurar nuestro middleware, el cual estaremos usando rutas y codificacion de la informacion por json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//tenemos que configurar las vistas que se van ejecutar
app.set('view engine', 'ejs');
//donde se encuentra el directorio de dichas vistas
app.set('views', __dirname + '/views');

//para la carga de imagenes, css, multimedia, etc es necesario configurar una carpeta public, en la cual todos los recursos del proyecto se podran consumir
app.use(express.static(__dirname + '/public'));

//ruta para listar las inspecciones
app.get('/', (req, res) => {
const querry = 'SELECT * FROM inspecciones ORDER BY fecha_reporte DESC';
  bd.query(querry, (error, resultados) => {
    if (error) return res.status(500).send('Error al obtener inspecciones');
    res.render('index', { inspecciones: resultados });
  });
});


//ruta para crear una inspeccion
app.post('/inspecciones', (req, res) => {
const { fecha, equipo, sintoma, diagnostico, correccion, piezas, inactividad } = req.body;
  const query = `INSERT INTO inspecciones 
  (fecha_reporte, equipo_id, sintoma, diagnostico, accion_correctiva, piezas_reemplazadas, tiempo_inactividad) 
  VALUES (?, ?, ?, ?, ?, ?, ?)`;
bd.query(query, [fecha, equipo, sintoma, diagnostico, correccion, piezas, inactividad], (error) => {
  if (error) return res.status(500).send('Error al crear la inspección');
  res.redirect('/');
});
});

//ruta para eliminar la inspeccion
app.get('/inspecciones/delete/:id', (req, res) =>{
    const inspeccionid = req.params.id;
    const querry = `DELETE FROM inspecciones WHERE id = ${inspeccionid};`;
    bd.query(querry, (error, resultados) =>{
        if(error){
            console.log('Error al eliminar la inspeccion: ' + error);
            res.status(500).send('Error al eliminar la inspeccion');
        }
        res.redirect('/');
    });
});

//ruta para buscar y actualizar 
// app.js - editar inspección
app.get('/inspecciones/edit/:id', (req, res) => {
  const inspeccionid = req.params.id;
  const query = 'SELECT * FROM inspecciones WHERE id = ?';
  bd.query(query, [inspeccionid], (error, resultados) => {
    if (error) return res.status(500).send('Error al obtener la inspección');
    res.render('edit', { inspeccion: resultados[0] }); // 👈 singular
  });
});

app.post('/inspecciones/update/:id', (req, res) => {
  const inspeccionid = req.params.id;
  const { fecha, equipo, sintoma, diagnostico, correccion, piezas, inactividad } = req.body;
  const query = `UPDATE inspecciones 
    SET fecha_reporte=?, equipo_id=?, sintoma=?, diagnostico=?, accion_correctiva=?, piezas_reemplazadas=?, tiempo_inactividad=? 
    WHERE id=?`;
  bd.query(query, [fecha, equipo, sintoma, diagnostico, correccion, piezas, inactividad, inspeccionid], (error) => {
    if (error) {
      console.log('Error al actualizar la inspeccion: ' + error);
      return res.status(500).send('Error al actualizar la inspeccion');
    }
    res.redirect('/');
  });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});