// Importaciones de archivos
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Curso = require('../models/curso');
const AsignarCursos = require('../models/asignar-cursos');


// Verificando que el rol exista en la DB
const esRoleValido = async(rol = '') => {
    
    const existeRol = await Role.findOne({rol});

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`);
    }
}

// Verificando si el correo existe en la DB
const correoExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if (existeEmail) {
        throw new Error(`El email ${correo} existe ya esta registrado en la DB`);
    }
}

// Verificando si existe el ID del Usuario
const existeUsuarioPorId = async(id) => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario) {
        throw new Error (`El id ${id} no existe`);
    }

}

// Verificando si existe el ID del Curso
const existeCursoPorId = async(id) => {
    
    const existeCurso = await Curso.findById(id);

    if(!existeCurso) {
        throw new Error (`El curso ${id} no existe`);
    }
}

// Verificando si existe el ID de la Asignación
const existeAsignacionPorId = async(id) => {
    
    const existeCurso = await AsignarCursos.findById(id);

    if(!existeCurso) {
        throw new Error (`La asignación ${id} no existe`);
    }
}

// Verificando si existe asignacion creda
const existeAsignacion = async(usuario_id = '') => {
    
    const existeAsignacion = await AsignarCursos.findOne(usuario_id);

    if(!existeAsignacion) {
        throw new Error (`La asignación ${id} ya existe`);
    }
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId,
    existeCursoPorId,
    existeAsignacionPorId,
    existeAsignacion
}