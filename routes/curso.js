// Importaciones principales
const { Router } = require('express');
const { check } = require('express-validator');

// Importaciones de archivos
const { getCursos, postCurso, putCurso, deleteCurso, getTodosCursos } = require('../controllers/curso');
const { existeCursoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// privado - solo maestro
router.get('/mostrar-todo', [validarJWT], getTodosCursos)

// privado - solo maestros
router.get('/mostrar', [
    validarJWT,
    esAdminRole
], getCursos);

// privado - solo maestros
router.post('/agregar', [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postCurso);

// privado - solo maestros
router.put('/editar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCursoPorId),
    validarCampos
], putCurso);

// privado - solo maestros
router.delete('/eliminar/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCursoPorId),
    validarCampos
], deleteCurso);

module.exports = router;