const { findOne } = require('../model/reviewModel');
const User = require('../model/userModel');

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: 'Success',
      user: user,
    });
  } catch (error) {
    res.status(200).json({
      status: 'failed',
      message: error.message,
    });
  }
};
exports.verifyExisting = async (req, res, next) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        status: 'Existing user',
        user: existingUser,
      });
    }
    return next();
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Cannot verify user',
    });
  }
};

exports.createUser = async (req, res, next) => {
  try {
    console.log('Body Received', req.body);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      profileImg: req.body.photoUrl || '',
    });
    console.log(user);
    res.status(200).json({
      status: 'Success',
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
exports.findCurrentUser = async (req, res, next) => {
  const { email } = req.params;
  try {
    const currentUser = await findOne({ email });
    res.status(200).json({
      status: 'success',
      data: currentUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
