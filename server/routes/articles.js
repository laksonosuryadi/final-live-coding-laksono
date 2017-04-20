var express = require('express');
var router = express.Router();
var Article = require('../controllers/articleController')

var Check = require('../helpers/authentication')
var Current = require('../helpers/current')

router.post('/', Check.isLoggedIn, Article.addArticle); //parameter: title, content, userId untuk me-refer siapa author nya
router.get('/', Check.isLoggedIn, Article.getArticles); //getting all questions in Isi.vue
router.get('/current', Current.showCurrentUser); //getting currently signed in username
router.get('/:articleId', Check.isLoggedIn, Article.getOneArticle); //getting detailed info of articles in Detail.vue
router.delete('/:articleId', Check.isLoggedIn, Article.deleteArticle);
router.get('/list/:authorId', Check.isLoggedIn, Article.getArticlesByAuthor);
router.put('/:articleId', Check.isLoggedIn, Article.editArticle);

module.exports = router;
