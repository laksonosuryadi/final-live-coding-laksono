var express = require('express');
var router = express.Router();
var User = require('../controllers/userController')

// router.get('/', function(req, res, next) {
//   res.send("FINAL LIVE CODING");
// });

router.post('/login', User.login)

module.exports = router;
