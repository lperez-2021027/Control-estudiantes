// Importaciones principales
const { response, request, query } = require('express');

// Importación del modelo
const Curso = require('../models/curso');

const getTodosCursos = async (req = request, res = response) => {
    
    const query = { estado: true};
    
    const listaTodosCursos = await Promise.all([
        Curso.countDocuments({}),
        Curso.find().populate('maestro', 'nombre')
    ]);

    res.json({
        msg: 'GET API - Controlador Curso',
        listaTodosCursos
    })

}

const getCursos = async (req = request, res = response) => {

    const data =  req.usuario._id;

    const query = { estado: true, maestro: data };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query).populate('maestro', 'nombre')
    ]);

    res.json({
        msg: 'GET API - Controlador Curso',
        listaCursos
    })
}

const postCurso = async (req = request, res = response) => {

    // const { nombre } = req.body;
    // const cursoGuardado = new Curso({ nombre });

    // const cursoDB = await Curso.findOne({nombre});

    // if (cursoDB) {
    //     return res.status(400).json({
    //         msg: `El curso ${ cursoDB.nombre }, ya existe`
    //     })
    // }

    // await cursoGuardado.save();

    // res.json({
    //     msg: 'POST API - Controlador Curso',
    //     cursoGuardado
    // })

    const { maestro, ...resto } = req.body;

    const cursoDB = await Curso.findOne({nombre: resto.nombre});

    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${ cursoDB.nombre }, ya existe`
        })
    }

    const data = {
        ...resto,
        maestro: req.usuario._id
    }

    const curso = await Curso(data);

    await curso.save();

    res.json({
        msg: 'POST API - Controlador Curso',
        curso
    })

}

const putCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    const cursoDB = await Curso.findOne({nombre: resto.nombre});

    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${ cursoDB.nombre }, ya existe`
        })
    }

    const data = req.usuario._id

    // if (data != id) {
    //     return res.status(400).json({
    //         msg: 'EL maestro solo puede editar sus cursos'
    //     })
    // }

    const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: 'PUT API - Controlador Curso',
        cursoEditado,
        data,
        id
    })

}

const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;

    const cursoEliminado = await Curso.findByIdAndDelete(id);

    //const cursoEliminado_ = await Curso.findByIdAndUpdate(id, { estado: true })

    res.json({
        msg: 'DELETE API - Controlador Curso',
        cursoEliminado
    })

}

module.exports = {
    getTodosCursos,
    getCursos,
    postCurso,
    putCurso,
    deleteCurso
}