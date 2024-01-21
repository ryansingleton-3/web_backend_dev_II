const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  favoriteColor: String,
  birthday: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema, 'contacts'); // this last parameter specifies the collection name


module.exports = Contact;
