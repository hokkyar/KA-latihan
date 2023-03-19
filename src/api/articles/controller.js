const { Article } = require('../../models/index')
// const { nanoid } = require('nanoid')

exports.getAllArticles = async (req, res) => {
  res.json({
    message: 'Get all articles',
  })
}

exports.getArticleById = async (req, res) => {
  res.json({
    message: 'Get article by id',
  })
}

exports.postArticle = async (req, res) => {
  res.status(201).json({
    message: 'Create article success',
    id: '123'
  })
}

exports.updateArticle = async (req, res) => {
  res.json({
    message: 'Update article success',
    id: '123'
  })
}

exports.deleteArticle = async (req, res) => {
  res.json({
    message: 'Delete article success',
    id: '123'
  })
}
