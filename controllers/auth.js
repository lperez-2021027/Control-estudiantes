// Importaciones principales
const { request, response } = require('express');
const bcrypt = require('bcryptjs');

// Importaciones de archivos
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jw');

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - (El correo no existe)'
            })
        }

        // Verificando si el usuario esta activo (estdo = false)
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la password
        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - (password incorrecta)'
            });
        }

        // Generando JWT
        const token = await generarJWT(usuario.id);

        const pass = usuario.password;

        res.json({
            msg: 'login path',
            correo, pass,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }

}

module.exports = {
    login
}