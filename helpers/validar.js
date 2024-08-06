const validador = require('validator');

const validarArticulo = (parametros) => {
    let validar_titulo = !validador.isEmpty(parametros.title) &&
        validador.isLength(parametros.title, { min: 5, max: undefined });
    let validar_contenido = !validador.isEmpty(parametros.content);

    if (!validar_titulo || !validar_contenido) {
        throw new Error('Los datos no son válidos');
    }
}

module.exports = {
    validarArticulo
}