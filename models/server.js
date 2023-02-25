// Importacines principales
const express = require('express');
const cors = require('cors');

// Importacioens de archivos
const { dbConection } = require('../database/config');

class Server {

    constructor() {
        
        //Configuración inicial
        this.app = express();
        this.port = process.env.PORT;

        // Rutas (en forma de objeto)
        this.paths = {
            auth:           '/api/auth',
            cursos:         '/api/cursos',
            alumnos:        '/api/alumnos',
            maestros:       '/api/maestros',
            asignarCursos:  '/api/asignar-cursos'
        }

        // Conexión a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();

    }

    // Función para conectar a base de datos
    async conectarDB() {
        await dbConection();
    }

    // Función que se ejecuta andes de las rutas
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.alumnos, require('../routes/alumno'));
        this.app.use(this.paths.maestros, require('../routes/maestro'));
        this.app.use(this.paths.cursos, require('../routes/curso'));
        this.app.use(this.paths.asignarCursos, require('../routes/asignar-curso'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        })
    }

}

// Exportando la clase
module.exports = Server;