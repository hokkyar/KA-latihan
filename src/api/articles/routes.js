const express = require('express')
const router = express.Router()

const ArticleController = require('./controller')

router.get('/articles', ArticleController.getAllArticles)
router.get('/articles/:id', ArticleController.getArticleById)
router.post('/articles', ArticleController.createArticle)
router.put('/articles/:id', ArticleController.updateArticle)
router.delete('/articles/:id', ArticleController.deleteArticle)

module.exports = router