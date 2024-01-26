const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  text: String,
  starRating: Number,
  reviewer: String,
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema, 'reviews'); // this last parameter specifies the collection name


module.exports = Review;
