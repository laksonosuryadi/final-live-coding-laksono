var Article = require('../models/article');
var User = require('../models/user');

var addArticle = function (req, res) {
  Article.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.decoded.user
  }, function(err, result) {
    if(err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

var getArticles = function(req,res) {
  Article.find()
  .populate('author')
  .exec(function(err, article){
    if(err){
      res.send(err)
    } else {
      res.send(article)
    }
  })
}

var getOneArticle = function(req, res) {
  Article.findOne({
    _id: req.params.articleId
  })
  .populate('author')
  .exec(function(err, article) {
    if(err){
      res.send(err)
    } else {
      res.send(article)
    }
  })
}

var getArticlesByAuthor = function(req, res) {
  Article.find({
    author: req.params.authorId
  }, function (err, article) {
     if(err){
       res.send(err)
     } else {
       res.send(article)
     }
  })
}

var editArticle = function(req, res) {
  Article.findOneAndUpdate({
    _id: req.params.articleId
  },{
    title: req.body.title,
    content: req.body.content
  }, function(err, article) {
    if(err) {
      res.send(err)
    } else {
      res.send('Article updated')
    }
  })
}

var deleteArticle = function(req, res) {
  Article.findOneAndRemove({
    _id: req.params.articleId
  }, function(err, article){
    if(err){
      res.send(err)
    } else {
      res.send('Article deleted')
    }
  })
}

module.exports = {
  addArticle,
  getArticles,
  getOneArticle,
  editArticle,
  deleteArticle,
  getArticlesByAuthor
}
