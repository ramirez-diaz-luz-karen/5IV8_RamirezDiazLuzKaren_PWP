import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//si vamos a tener una base de datos en servidor debemos tener:
//import {fileURLToPath} from'url';

//const _filname = fileURLToPath(import.meta.url);
//const _filename = path.dirname(_filename);

//dotenv.config({path: path.resolver(_dirname, '../.env)});
dotenv.config();

const config = mysql2.createPool({

    host: 'localhost',
    user: 'root',
    password: 'kasanajisa1.',
    database: 'curso'

    //connectionLimit :10,
    //acquireTimeout

});

config.getConnection((err) =>{
    if(err){
        console.log('Error de conexion a la base de datos');
        return;
    }
    console.log('conexion exitosa a la base de datos');
    connection.release();
});

export default config;