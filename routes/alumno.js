// Importaciones principales
const { Router } = require('express');
const { check } = require('express-validator');

// Importaciones de archivos
const { getAlumnos, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno');
const { esRoleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

// privado - solo maestros
router.get('/mostrar', [
    validarJWT,
    esAdminRole
], getAlumnos);

// publico - crear alumno
router.post('/sing-up', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser mas de 6 digitos').isLength( {min: 6} ),
    check('correo', 'El correo no es valido').isEmail(),
    //check('rol').custom(esRoleValido),
    check('correo').custom(correoExiste),
    validarCampos
], postAlumno);

// privado - solo alumno
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], putAlumno);

// privado - solo alumno(él mismo)  y maestros
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteAlumno);

module.exports = router;