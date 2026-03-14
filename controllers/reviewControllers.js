const Review = require('../model/reviewModel');

exports.getAllReview = async (req, res, next) => {
  try {
    const review = await Review.find();
    res.status(200).json({
      status: 'success',
      review,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
exports.createReview = async (req, res, next) => {
  try {
    console.log('User req', req.body);
    if (!req.body.userid) {
      return res.status(400).json({
        status: 'failed',
        message: 'No user uid in backend',
      });
    }
    const newReview = await Review.create({
      rating: req.body.rating,
      review: req.body.review,
      user: req.body.userid,
    });
    await newReview.populate({
      path: 'user',
      select: 'name email profileImg -_id',
    });
    res.status(200).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'failed',
        message: 'You cannot create another review',
      });
    }
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
exports.editReview = async (req, res, next) => {
  console.log('Review id', req.params.id);
  try {
    const updatedreview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedreview) {
      throw Error('No review with this id');
    }
    res.status(200).json({
      status: 'success',
      data: { updatedreview },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
exports.deleteReview = async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id, {
    new: true,
    runValidators: true,
  });
  if (!review) throw Error('No review of this id found');
  res.status(200).json({
    status: 'success',
    message: 'Review Deleted',
  });
};

exports.getUserReview = async (req, res, next) => {
  const { userId } = req.params;
  console.log('User ID:', userId);

  try {
    if (!userId) {
      return res.status(400).json({ message: 'No user ID provided' });
    }

    const review = await Review.findOne({ user: userId });

    if (!review) {
      return res.status(404).json({
        message: 'No review found for this user',
      });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching user review:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};
