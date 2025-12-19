const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    max: 5,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to the user'],
  },
});

// reviewSchema.pre(/^find/, function (next) {
//   this.where({ rating: { $gte: 4 } });
//   next();
// });
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email profileImg -_id',
  });
  next();
});
reviewSchema.index({ user: 1 }, { unique: true });

const ReviewModel = mongoose.model('Review', reviewSchema);
module.exports = ReviewModel;
