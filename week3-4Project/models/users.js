const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullName: String,
  githubId: String,
  url: String,
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'users'); // this last parameter specifies the collection name


module.exports = User;
