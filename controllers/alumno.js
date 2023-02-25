// Importaciones principales
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

// Importación del modelo
const Alumno = require('../models/usuario');

const getAlumnos = async (req = request, res = response) => {

    const query = { estado: true, rol: "ALUMNO_ROLE" };

    const listaAlumnos = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
    ]);

    res.json({
        msg: 'GET API - Controlador Alumno',
        listaAlumnos
    })
}

const postAlumno = async (req = request, res = response) => {

    // Preparando datos para crear registro
    const { nombre, correo, password } = req.body;
    const alumnoGuardadoDB = new Alumno({ nombre, correo, password });

    // Encriptación de contraseña
    const salt = bcrypt.genSaltSync();
    alumnoGuardadoDB.password = bcrypt.hashSync(password, salt);

    // Guardando en DB
    await alumnoGuardadoDB.save();

    res.json({
        msg: 'POST API - Controlador Alumno',
        alumnoGuardadoDB
    })
}

const putAlumno = async (req = request, res = response) => {

    // Preparando datos para editar el registro
    const { id } = req.params;
    const { _id, rol, estado, ...resto } = req.body;

    const pass = resto.password;

    const data = req.usuario.id;

    if (data != id) {
        return res.status(401).json({
            msg: 'Unicamente puede editar su propio usuario'
        })
    }

    // try {
    //     if (pass.length < 5) {
    //         return res.status(400).json({
    //             msg: 'La contraseña debe de ser de mas de 6 digitos'
    //         })
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         msg: 'Hable con el administrador (BackEnd)'
    //     });
    // }

    // Encriptando la password si es modificada
    if (resto.password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    // Editar y guarda en la DB
    const alumnoEditado = await Alumno.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'PUT API - Controlador Alumno',
        alumnoEditado,
        data,
        id
    });

}

const deleteAlumno = async (req = request, res = response) => {

    // Preparando el id
    const { id } = req.params;

    // Eliminando físicamente de la DB
    //const alumnoEliminado_ = await Alumno.findByIdAndDelete(id);

    // Eliminando cambiando el estado a false
    const alumnoEliminado = await Alumno.findByIdAndUpdate(id, { estado: "false" });

    res.json({
        msg: 'PUT DELETE - Controlador Alumno',
        alumnoEliminado
    })

}

module.exports = {
    getAlumnos,
    postAlumno,
    putAlumno,
    deleteAlumno
}