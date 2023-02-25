// Importaciones principales
const { Router } = require('express');
const { check } = require('express-validator');

// Importaciones de archivos
const { getTodasAsignaciones, getAsignaciones, postAsignacion, putAsignacion, deleteAsignacion } = require('../controllers/asignar-curso');
const { validarCampos } = require('../middlewares/validar-campo');
const { existeAsignacionPorId, existeUsuarioPorId, existeCursoPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// privado - solo maestros
router.get('/mostrar-todo', [validarJWT, esAdminRole], getTodasAsignaciones);

// publico - alumnos
router.get('/mostrar', [validarJWT], getAsignaciones);

// publico - alumno
router.post('/agregar', [
    validarJWT,
    //check('id_usuario', 'El id del usuario es obligatorio').not().isEmpty(),
    check('id_cursos', 'No es un id de Mongo Valido').isMongoId(),
    check('id_cursos', 'El id del curso es obligatorio').not().isEmpty(),
    check('id_cursos').custom(existeCursoPorId),
    validarCampos
], postAsignacion);

// publico - alumno
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id_cursos', 'No es un id de Mongo Valido').isMongoId(),
    check('id_cursos', 'El id del curso es obligatorio').not().isEmpty(),
    check('id_cursos').custom(existeCursoPorId),
    check('id').custom(existeAsignacionPorId),
    validarCampos
], putAsignacion);

// privado - solo maestros
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeAsignacionPorId),
    validarCampos
], deleteAsignacion);

module.exports = router;