const { Article } = require('../../models/index')
// const { nanoid } = require('nanoid')

exports.getAllArticles = async (req, res) => {
  res.json({
    message: 'get all articles',
  })
}

exports.getArticleById = async (req, res) => {
  res.json({
    message: 'get article by id',
  })
}

exports.createArticle = async (req, res) => {
  res.status(201).json({
    message: 'create article success',
    id
  })
}

exports.updateArticle = async (req, res) => {
  res.json({
    message: 'update article success',
    id
  })
}

exports.deleteArticle = async (req, res) => {
  res.json({
    message: 'delete article success',
    id
  })
}
