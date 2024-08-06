const express = require("express");
const router = express.Router();

const ArticleController = require('../controllers/article')

// Rutas de prueba
router.get('/ruta-de-prueba', ArticleController.prueba)
router.get('/curso', ArticleController.curso)

router.post('/crear', ArticleController.create)
router.get('/listar', ArticleController.getArticles)
router.get('/listar/:id', ArticleController.getOne)
router.delete('/borrar/:id', ArticleController.deleteArticle)
router.put('/actualizar/:id', ArticleController.update)

module.exports = router;