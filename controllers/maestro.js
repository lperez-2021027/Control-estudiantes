// Importaciones principales
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

// Importación del modelo
const Maestro = require('../models/usuario');

const getMaestros = async (req = request, res = response) => {

    const query = { estado: true, rol: "MAESTRO_ROLE"};

    const listaMaestros = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
    ]);

    res.json({
        msg: 'GET API - Controlador Maestro',
        listaMaestros
    })
}

const postMaestro = async (req = request, res = response) => {

    const { nombre, correo, password, code } = req.body;
    const rol = "MAESTRO_ROLE"
    const maestroGuardado = new Maestro({ nombre, correo, password, rol, code });

    const salt = bcrypt.genSaltSync();
    maestroGuardado.password = bcrypt.hashSync(password, salt);

    await maestroGuardado.save();

    res.json({
        msg: 'POST API - Controlador Maestro',
        maestroGuardado
    })

}

const putMaestro = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, rol, estado, ...resto } = req.body;

    const data = req.usuario.id;

    if (data != id) {
        return res.status(401).json({
            msg: 'Unicamente puede editar su propio usuario'
        })
    }

    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const maestroEditado = await Maestro.findByIdAndUpdate(id, resto, {new : true});

    res.json({
        msg: 'PUT API - Controlador Maestro',
        maestroEditado
    })

}

const deleteMaestro = async (req = request, res = response) => {

    const { id } = req.params;

    const data = req.usuario.id;

    if (data != id) {
        return res.status(401).json({
            msg: 'Unicamente puede eliminar su propio usuario'
        })
    }

    const maestroEliminado = await Maestro.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE API - Controlador Maestro',
        maestroEliminado
    });

}


module.exports = {
    getMaestros,
    postMaestro,
    putMaestro,
    deleteMaestro
}