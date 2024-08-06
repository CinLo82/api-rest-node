const validador = require("validator")
const Article = require("../models/Article")

const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: 'Soy una acción de prueba de mi controlador articulo',
    })
}

const curso = (req, res) => {

    console.log('Se ha ejecutado el endpoint probando')

    return res.status(200).json([{
        curso:"react",
        precio: 50,
        descripcion: "curso de react"
    },
    {
        curso:"vue",
        precio: 50,
        descripcion: "curso de vue"
    },
    {
        curso:"angular",
        precio: 50,
        descripcion: "curso de angular"
    }
    ])
}

const create = async(req, res) => {
    // recoger los parametros por post a guardar
    let parametros = req.body
    //validar los datos
    try{
        let validar_titulo = !validador.isEmpty(parametros.title) &&
        validador.isLength(parametros.title, {min: 5, max: undefined})                           
        let validar_contenido = !validador.isEmpty(parametros.content)

        if(!validar_titulo || !validar_contenido){
            throw new Error('Los datos no son validos')
        }
    }catch{
        return res.status(400).json({
            status: "error",
            mensaje: 'Faltan datos por enviar',
            error: error.message
        })
    }

    //crear el objeto a guardar || asignar valores a objeto basado en el modelo (automatico)
    const article = new Article(parametros)

    //
    try {
        // Guardar el articulo en la bd
        const articuloGuardado = await article.save();
        // Devolver una respuesta
        return res.status(200).json({
            status: "success",
            mensaje: 'El articulo se ha guardado',
            article: articuloGuardado
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: 'El articulo no se ha guardado',
            error: error.message
        });
    }
}

const getArticles = async (req, res) => {
    try {
        // Find
        const articles = await Article.find({})
            .limit(3)
            .sort({date: -1})
            .exec()                                  
        if (!articles || articles.length === 0) {
            return res.status(404).json({
                status: "error",
                mensaje: 'No hay articulos para mostrar'
            });
        }
        return res.status(200).json({
            status: "success",
            contador: articles.length,
            articles
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: 'Error al obtener los articulos',
            error: error.message
        });
    }
}


const getOne = async (req, res) => {
    try {
        // Recoger un id por la URL
        let id = req.params.id;

        // Buscar el artículo
        const article = await Article.findById(id);

        // Si no existe, devolver el error
        if (!article) {
            return res.status(404).json({
                status: "error",
                mensaje: 'No existe el artículo'
            });
        }

        // Devolver el artículo
        return res.status(200).json({
            status: "success",
            article
        });
    } catch (err) {
        // Manejar errores
        return res.status(500).json({
            status: "error",
            mensaje: 'Error al obtener el artículo',
            error: err.message
        });
    }
};

const deleteArticle = async(req, res) => {

    try {
        // Recoger un id por la URL
        let articleId = req.params.id;

        // Buscar el artículo
        const article = await Article.findByIdAndDelete({_id : articleId});

        // Si no existe, devolver el error
        if (!article) {
            return res.status(404).json({
                status: "error",
                mensaje: 'No existe el artículo'
            });
        }

        // Devolver el artículo
        return res.status(200).json({
            status: "success",
            mensaje: 'El artículo se ha eliminado',
            article
        });
    } catch (err) {
        // Manejar errores
        return res.status(500).json({
            status: "error",
            mensaje: 'Error al eliminar el artículo',
            error: err.message
        });
    }
}

const update = async (req, res) => {
    // Recoger el id del artículo
    let articleId = req.params.id;

    // Recoger los datos que llegan por PUT
    let parametros = req.body;

    // Validar los parámetros
    try {
        let validar_titulo = !validador.isEmpty(parametros.title) &&
            validador.isLength(parametros.title, { min: 5, max: undefined });
        let validar_contenido = !validador.isEmpty(parametros.content);

        if (!validar_titulo || !validar_contenido) {
            throw new Error('Los datos no son válidos');
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: 'Faltan datos por enviar',
            error: error.message
        });
    }

    // Buscar y actualizar el artículo por id
    try {
        const articleActualizado = await Article.findByIdAndUpdate(articleId, parametros, { new: true });

        if (!articleActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: 'No existe el artículo'
            });
        }

        // Devolver el artículo actualizado
        return res.status(200).json({
            status: "success",
            mensaje: 'El artículo se ha actualizado',
            article: articleActualizado
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: 'Error al actualizar el artículo',
            error: error.message
        });
    }
};


module.exports = {
    prueba, 
    curso, 
    create,
    getArticles, 
    getOne, 
    deleteArticle,
    update
}