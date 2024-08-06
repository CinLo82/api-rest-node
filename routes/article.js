const express = require("express");
const multer = require("multer")
const path = require('path');
const fs = require('fs');

const router = express.Router();
const ArticleController = require('../controllers/article')


// Configurar multer
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/articles');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: almacenamiento });

// Rutas de prueba
router.get('/ruta-de-prueba', ArticleController.prueba)
router.get('/curso', ArticleController.curso)

router.post('/crear', ArticleController.create)
router.get('/listar', ArticleController.getArticles)
router.get('/listar/:id', ArticleController.getOne)
router.delete('/borrar/:id', ArticleController.deleteArticle)
router.put('/actualizar/:id', ArticleController.update)
router.post('/subir-imagen/:id', [upload.single('file')], ArticleController.upload);
router.get('/imagen/:fichero', ArticleController.imagen);
router.get('/buscar/:busqueda', ArticleController.search);

module.exports = router;