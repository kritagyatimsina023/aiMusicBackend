const outputModel = require('../model/outputModel');

exports.getOutput = async (req, res, next) => {
  const { id, promptId } = req.params;
  console.log('This is backend userId ', id);
  console.log('This is backend promptId', promptId);

  try {
    const outputData = await outputModel.find({ user: id, prompt: promptId });
    console.log('This is outputData', outputData);

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
  console.log('This is backend response', req.body);

  try {
    const outputData = await outputModel.create({
      emotion: req.body.emotion,
      score: req.body.score || null,
      user: req.body.userId,
      prompt: req.body.promptId,
      session_id: req.body.session_id,
      status: req.body.status,
      version_used: req.body.version_used,

      downloads: {
        audio: req.body.downloads?.audio || null,
        midi: req.body.downloads?.midi || null,
      },

      playback: {
        audio: req.body.playback?.audio || null,
        midi: req.body.playback?.midi || null,
      },

      variants:
        req.body.variants?.map((variant) => ({
          variant_index: variant.variant_index,
          score: variant.score || null,
          downloads: {
            audio: variant.downloads?.audio || null,
            midi: variant.downloads?.midi || null,
          },
          playback: {
            audio: variant.playback?.audio || null,
            midi: variant.playback?.midi || null,
          },
        })) || [],
    });

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
