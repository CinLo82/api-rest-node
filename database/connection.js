const mongoose = require('mongoose')

const connection = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mi_blog', {
        //  useNewUrlParser: true,
        // useUnifiedTopology: true
        })
        console.log('Conectados correctamente a la base de datos mi blog')
    } catch (error) {
        console.log(error)
        throw new Error('No se ha podido conectar a la base de dato')
    }
} 

module.exports = connection