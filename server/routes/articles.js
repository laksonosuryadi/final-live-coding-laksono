var express = require('express');
var router = express.Router();
var Article = require('../controllers/articleController')

var Check = require('../helpers/authentication')
var Current = require('../helpers/current')

router.post('/', Check.isLoggedIn, Article.addArticle);
router.get('/', Check.isLoggedIn, Article.getArticles);
router.get('/current', Current.showCurrentUser);
router.get('/:articleId', Check.isLoggedIn, Article.getOneArticle); 
router.delete('/:articleId', Check.isLoggedIn, Article.deleteArticle);
router.get('/list/:authorId', Check.isLoggedIn, Article.getArticlesByAuthor);
router.put('/:articleId', Check.isLoggedIn, Article.editArticle);

module.exports = router;
