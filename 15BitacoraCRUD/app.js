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
  const v = validarInspeccion(req.body);
  if (!v.ok) {
    // Renderiza la vista index con los errores
    const querry = 'SELECT * FROM inspecciones ORDER BY fecha_reporte DESC';
    bd.query(querry, (error, resultados) => {
      if (error) return res.status(500).send('Error al obtener inspecciones');
      res.render('index', { inspecciones: resultados, errores: v.errores });
    });
    return;
  }

  const q = `
    INSERT INTO inspecciones
    (fecha_reporte, equipo_id, sintoma, diagnostico, accion_correctiva, piezas_reemplazadas, tiempo_inactividad)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const vals = [
    v.values.fecha_reporte,
    v.values.equipo_id,
    v.values.sintoma,
    v.values.diagnostico,
    v.values.accion_correctiva,
    v.values.piezas_reemplazadas,
    v.values.tiempo_inactividad
  ];

  bd.query(q, vals, (error) => {
    if (error) {
      console.log('Error al crear la inspección:', error);
      return res.status(500).send('Error al crear la inspección');
    }
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
app.get('/inspecciones/edit/:id', (req, res) => {
  const inspeccionid = req.params.id;
  const query = 'SELECT * FROM inspecciones WHERE id = ?';
  bd.query(query, [inspeccionid], (error, resultados) => {
    if (error) return res.status(500).send('Error al obtener la inspección');
    res.render('edit', { inspeccion: resultados[0] }); // 👈 singular
  });
});

app.post('/inspecciones/update/:id', (req, res) => {
  const inspeccionid = Number(req.params.id);
  if (!Number.isInteger(inspeccionid)) return res.status(400).send('ID inválido');

  const v = validarInspeccion(req.body);
  if (!v.ok) {
    const query = 'SELECT * FROM inspecciones WHERE id = ?';
    bd.query(query, [inspeccionid], (error, resultados) => {
      if (error) return res.status(500).send('Error al obtener la inspección');
      res.render('edit', { inspeccion: resultados[0], errores: v.errores });
    });
    return;
  }

  const q = `
    UPDATE inspecciones
    SET fecha_reporte=?, equipo_id=?, sintoma=?, diagnostico=?, accion_correctiva=?, piezas_reemplazadas=?, tiempo_inactividad=?
    WHERE id=?
  `;
  const vals = [
    v.values.fecha_reporte,
    v.values.equipo_id,
    v.values.sintoma,
    v.values.diagnostico,
    v.values.accion_correctiva,
    v.values.piezas_reemplazadas,
    v.values.tiempo_inactividad,
    inspeccionid
  ];

  bd.query(q, vals, (error) => {
    if (error) {
      console.log('Error al actualizar la inspección:', error);
      return res.status(500).send('Error al actualizar la inspección');
    }
    res.redirect('/');
  });
});

// Convierte "" a null y recorta strings
function normalize(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') {
    const t = value.trim();
    return t === '' ? null : t;
  }
  return value;
}

function toIntOrNull(v) {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
}

function toNumberOrNull(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function isValidISODate(v) {
  if (typeof v !== 'string') return false;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(v)) return false;
  const d = new Date(v);
  return !isNaN(d.getTime());
}

function validarInspeccion(body) {
  const errores = [];

  const fecha = normalize(body.fecha);
  const equipo = normalize(body.equipo);
  const sintoma = normalize(body.sintoma);
  const diagnostico = normalize(body.diagnostico);
  const correccion = normalize(body.correccion);
  const piezas = normalize(body.piezas);
  const inactividadRaw = normalize(body.inactividad);


  if (!fecha) {
    errores.push("El campo 'fecha' es obligatorio");
  } else if (!isValidISODate(fecha)) {
    errores.push("La fecha debe estar en formato AAAA-MM-DD");
  }

  if (!equipo) errores.push("El campo 'equipo' es obligatorio");

  const equipoId = toIntOrNull(equipo);
  if (equipo && equipoId === null) {
    errores.push("El campo 'equipo' debe ser un número entero");
  }

  if (!sintoma) errores.push("El campo 'sintoma' es obligatorio");
  if (!diagnostico) errores.push("El campo 'diagnostico' es obligatorio");
  if (!correccion) errores.push("El campo 'accion correctiva' es obligatorio");
  if (!piezas) errores.push("El campo 'piezas reemplazadas' es obligatorio");


  if (!inactividadRaw) {
    errores.push("El campo 'tiempo de inactividad' es obligatorio");
  }

  const inactividad = toNumberOrNull(inactividadRaw);
  if (inactividadRaw && (inactividad === null || inactividad < 0)) {
    errores.push("El tiempo de inactividad debe ser un número mayor o igual a 0");
  }

  if (errores.length > 0) {
    return { ok: false, errores };
  }

  return {
    ok: true,
    values: {
      fecha_reporte: fecha,
      equipo_id: equipoId,
      sintoma,
      diagnostico,
      accion_correctiva: correccion,
      piezas_reemplazadas: piezas,
      tiempo_inactividad: inactividad
    }
  };
}



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

