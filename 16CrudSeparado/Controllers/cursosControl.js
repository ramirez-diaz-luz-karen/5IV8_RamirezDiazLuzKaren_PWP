//Necesitamos crear un CRUD para cursos
//Necesitamos la conexión a la base de datos
const dbConnection = require('../database/db.js');

//Vamos a crear los eendpoints
const getCursos = (req, res) => {
    try {
        dbConnection.query('SELECT * FROM cursos', (err, results) => {
            if (err) {
                return res.status(400).json({ message: 'Error al obtener los cursos' });
                console.log(err);
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
        console.log(error);
    }
};

const getCursoByid = (req, res) => {
    try {
        dbConnection.query('SELECT * FROM cursos WHERE id = ?', [id], (err, results) => {
            if (err) {
                return res.status(400).json({ message: 'Error al obtener los cursos' });
                console.log(err);
            } else {
                res.status(200).json(results);
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
        console.log(error);
    }
};

modeule.exports = {
    getCursos,
    getCursoByid
}