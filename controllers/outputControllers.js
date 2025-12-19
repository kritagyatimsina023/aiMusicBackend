const outputModel = require('../model/outputModel');

exports.getOutput = async (req, res, next) => {
  const { id, promptId } = req.params;
  try {
    const outputData = await outputModel.find({ user: id, prompt: promptId });
    res.status(200).json({
      status: 'success',
      data: outputData,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};
exports.insertOutput = async (req, res, next) => {
  try {
    const outputData = await outputModel.create({
      emotion: req.body.emotion,
      user: req.body.userId,
      lottieEmoji: req.body.emotion,
      prompt: req.body.promptId,
      session_id: req.body.session_id,
      downloads: {
        audio: req.body.downloads?.audio,
        midi: req.body.downloads?.midi,
      },
      playback: {
        audio: req.body.playback?.audio,
        midi: req.body.playback?.midi,
      },
    });
    res.status(200).json({
      status: 'success',
      data: outputData,
    });
  } catch (error) {
    res.status(200).json({
      status: 'failed',
      message: error.message,
    });
  }
};
