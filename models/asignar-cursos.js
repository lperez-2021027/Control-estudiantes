const { Schema, model } = require('mongoose');

const AsignarCursoSchema = Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    id_cursos: [{
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    }]
});


module.exports = model('AsignarCurso', AsignarCursoSchema);