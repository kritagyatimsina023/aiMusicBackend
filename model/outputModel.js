const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema(
  {
    variant_index: {
      type: Number,
    },
    score: {
      type: Number,
      default: null,
    },
    downloads: {
      audio: { type: String, default: null },
      midi: { type: String, default: null },
    },
    playback: {
      audio: { type: String, default: null },
      midi: { type: String, default: null },
    },
  },
  { _id: false },
);

const outputSchema = new mongoose.Schema({
  emotion: {
    type: String,
  },
  score: {
    type: Number,
    default: null,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'It should be user prompt'],
  },
  prompt: {
    type: mongoose.Schema.ObjectId,
    ref: 'Prompt',
    required: [true, 'It should have prompt id'],
  },
  downloads: {
    audio: { type: String, default: null },
    midi: { type: String, default: null },
  },
  playback: {
    audio: { type: String, default: null },
    midi: { type: String, default: null },
  },
  session_id: { type: String },
  status: { type: String },
  version_used: { type: String },

  variants: {
    type: [variantSchema],
    default: [],
  },
});

const outputModel = mongoose.model('Output', outputSchema);
module.exports = outputModel;
