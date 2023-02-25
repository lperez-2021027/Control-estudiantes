// Importaciones principales
const { Router } = require('express');
const { check } = require('express-validator');

// Importaciones de archivos
const { getMaestros, postMaestro, putMaestro, deleteMaestro } = require('../controllers/maestro');
const { esRoleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// privado - solo maestros
router.get('/mostrar', [
    validarJWT,
    esAdminRole
],getMaestros);

// privado - solo maestros
router.post('/sing-up', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 digitos').isLength( {min: 6} ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(correoExiste),
    check('code', 'No').not().isEmpty(),
    validarCampos
], postMaestro);

// privado - solo maestros
router.put('/editar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], putMaestro);

// privado - solo maestros
router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],deleteMaestro);

module.exports = router;