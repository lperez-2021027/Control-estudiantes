// Importaciones principales
require('dotenv').config();

// Importanciones de archivos
const Server = require('./models/server');

// Intancia del servidor de arranque
const servidorIniciado = new Server();

// Levantando el servidor con el metodo 'listen'
servidorIniciado.listen();