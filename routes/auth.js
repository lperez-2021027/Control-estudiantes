// Importaciones principales
const {Router} = require('express');
const { check } = require('express-validator');

// Importaciones de archivos
const {login} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campo');

const router = Router();

// Manejo de rutas
router.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos 
], login);

module.exports = router;