const Prompt = require('../model/promptModel');

exports.getAllPrompt = async (req, res, next) => {
  try {
    const prompt = await Prompt.find();
    res.status(200).json({
      status: 'Success',
      prompt,
    });
  } catch (error) {
    res.status(200).json({
      staus: 'failed',
      message: error.message,
    });
  }
};
exports.getUserAllPrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const promptData = await Prompt.find({ user: id });
    res.status(200).json({
      status: 'success',
      promptData,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.createPrompt = async (req, res, next) => {
  try {
    const newPrompt = await Prompt.create({
      name: req.body.name,
      lyrics: req.body.lyrics,
      version: req.body.version,
      // genre: req.body.genre,
      // instruments: req.body.instruments,
      // tempo: req.body.tempo,
      // key: req.body.key,
      user: req.body.userid,
    });
    await newPrompt.populate({
      path: 'user',
      select: '-__v',
    });
    res.status(200).json({
      status: 'success',
      data: {
        prompt: newPrompt,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
