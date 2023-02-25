const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio' ]
    },
    rol: {
        type: String,
        required: true,
        default: "ALUMNO_ROLE"
    },
    estado: {
        type: Boolean,
        default: true
    }
    // ,
    // curso: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Curso',
    //     required: true
    // }
});


module.exports = model('Usuario', UsuarioSchema);