import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const config = mysql.createPool({

    host: 'localhost',
    user: 'root',
    password: 'kasanajisa1.',
    database: 'gato_de_gatos'

});

config.getConnection((err) => {
    if(err){
        console.log('Error de conexion a la base de datos', err);
        return;
    }   
    console.log('Conexion exitosa a la base de datos');
    connection.release();
});

export default config;