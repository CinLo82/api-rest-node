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

module.exports = {
    prueba, 
    curso
}