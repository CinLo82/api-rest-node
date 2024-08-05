const connection = require('./database/connection.js')
const express = require('express')
const cord = require('cors')

//inicializar app
console.log('app de node arrancada')

// conectar a la base de dato
connection()

// crear servidor de node
const app = express()
const PORT = process.env.PORT || 4000

// configurar cors
app.use(cord())

// convertir body a objeto js
app.use(express.json())

// crear rutas
app.get('/probando', (req, res) => {
    res.json([{
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
    }])
})

app.get('/', (req, res) => {
    res.send(`
        <h1>Blog de tecnologia</h1>`)
})

// puerto de la app
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
    })