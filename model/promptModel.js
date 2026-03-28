const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lyrics: {
    type: String,
    required: [true, 'Prompt is requied'],
    maxlength: [800, 'Prompt cannot be greater than 800 words'],
    minlength: [10, 'Prompt should be greated than 10 words'],
  },
  version: {
    type: String,
    enum: ['version_1', 'version_2', 'version_3'],
    default: 'version_1',
  },
  caption: {
    type: String,
    required: [true, 'A caption is required'],
  },
  ceatedAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'It should be user prompt'],
  },
});
promptSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    try {
      // Delete all outputs associated with this prompt
      await mongoose.model('Output').deleteMany({ prompt: this._id });
      next();
    } catch (error) {
      next(error);
    }
  },
);
const PromptModel = mongoose.model('Prompt', promptSchema);
module.exports = PromptModel;
