var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  username : {
    type: String,
    required: [true, 'Username is required']
  },
  password : {
    type: String,
    required: [true, 'Password is required']
  },
  email : {
    type: String,
    required: [true, 'Email is required']
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
