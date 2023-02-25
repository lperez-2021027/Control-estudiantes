// Importaciones principales
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

// Importación del modelo
const AsignarCurso = require('../models/asignar-cursos');
const Curso = require('../models/curso');

const getTodasAsignaciones = async (req = request, res = response) => {

    const listaTodasAsignaciones = await Promise.all([
        AsignarCurso.countDocuments({}),
        AsignarCurso.find({})
            .populate('id_cursos', 'nombre')
            .populate('id_usuario', 'nombre')
    ]);

    res.json({
        msg: 'GET API - Controlador Asignar-curso',
        listaTodasAsignaciones
    });

}

const getAsignaciones = async (req = request, res = response) => {

    //const query = ( { rol: "ALUMNO_ROLE "});

    const data = req.usuario._id

    //const idC = req.id_cursos;

    // const queryC = { estado: true };

    // const listaCursos = await Promise.all([
    //     Curso.countDocuments(queryC)
    // ]);



    const query = ({ id_usuario: data });

    const listaAsignaciones = await Promise.all([
        AsignarCurso.countDocuments(query),
        AsignarCurso.find(query)
            .populate('id_cursos', 'nombre')
            .populate('id_usuario', 'nombre')
    ]);

    res.json({
        msg: 'GET API - Controlador Asignar-curso',
        listaAsignaciones
    });
}

const postAsignacion = async (req = request, res = response) => {

    const { id_usuario, ...resto } = req.body;

    
    // 

    const todosCursos = resto.id_cursos

    const c1 = resto.id_cursos[0];
    const c2 = resto.id_cursos[1];
    const c3 = resto.id_cursos[2];

    const cursos = resto.id_cursos[3];

    //const asignacionDB = await AsignarCurso.findOne({});

    // Validando que no se repitan cursos
    if (c1 === c2 || c2 === c3 || c1 === c3) {
        return res.status(400).json({
            msg: 'El alumno no puede estar asignado al mismo curso más de una vez'
        })
    }

    if (cursos) {
        return res.status(400).json({
            msg: 'El alumno solo puede estar asignado a 3 cursos'
        })
    }

    

    const data = {
        ...resto,
        id_usuario: req.usuario._id
    }

    const asignar = await AsignarCurso(data);

    const idUser = asignar.id_usuario;

    const query = ({ id_usuario: idUser });

    const listaAsignaciones = await Promise.all([
        AsignarCurso.countDocuments(query)
    ]);

    if (listaAsignaciones != 0) {
        return res.status(400).json({
            msg: 'El usuario ya se encuentra asignado'
        })
    }

    // if (idUser == data.id_usuario) {
    //     return res.status(400).json({
    //         msg: 'El usuario ya se encuentra asignado'
    //     })
    // }

    await asignar.save();

    res.json({
        msg: 'POST API - Controlador Asignar-curso',
        asignar,
        idUser,
        listaAsignaciones,
        todosCursos
    });

}

const putAsignacion = async (req = request, res = response) => {

    const { id } = req.params;

    const { id_usuario, ...resto } = req.body;

    const c1 = resto.id_cursos[0];
    const c2 = resto.id_cursos[1];
    const c3 = resto.id_cursos[2];

    const cursos = resto.id_cursos[3];

    if (c1 === c2 || c2 === c3 || c1 === c3) {
        return res.status(400).json({
            msg: 'El alumno no puede estar asignado al mismo curso más de una vez'
        })
    }

    if (cursos) {
        return res.status(400).json({
            msg: 'El alumno solo puede estar asignado a 3 cursos'
        })
    }

    //const id_us = AsignarCurso._id();

    // const data = req.usuario.id;

    // if (data != id) {
    //     return res.status(401).json({
    //         msg: 'Unicamente puede editar su propia asignación'
    //     })
    // }

    const asignacionActualizada = await AsignarCurso.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'PUT API - Controlador Asignar-curso',
        asignacionActualizada,
        id
        // data,
        // id_us
    });

}

const deleteAsignacion = async (req = request, res = response) => {

    const { id } = req.params;

    const asignacionEliminada = await AsignarCurso.findByIdAndDelete(id);

    res.status(201).json({
        msg: 'PUT API - Controlador Asignar-curso',
        id,
        asignacionEliminada
    });

}

module.exports = {
    getTodasAsignaciones,
    getAsignaciones,
    postAsignacion,
    putAsignacion,
    deleteAsignacion
}