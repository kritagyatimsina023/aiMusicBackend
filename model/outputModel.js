const mongoose = require('mongoose');

const outputSchema = new mongoose.Schema({
  emotion: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'It should be user prompt'],
  },
  prompt: {
    type: mongoose.Schema.ObjectId,
    ref: 'Prompt',
    required: [true, 'It should have promt id'],
  },
  downloads: {
    audio: { type: String }, // "/download/audio/<id>"
    midi: { type: String },
  },
  playback: {
    audio: { type: String },
    midi: { type: String },
  },
  session_id: { type: String },
  lottieEmoji: {
    type: Object,
  },
});

const outputModel = mongoose.model('Output', outputSchema);
module.exports = outputModel;
