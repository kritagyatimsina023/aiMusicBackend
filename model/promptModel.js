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
  // genre: {
  //   type: String,
  //   required: [true, 'Genre must be selected'],
  // },
  // instruments: {
  //   type: Array,
  //   // validate: {
  //   //   validator: function (value) {
  //   //     return value.length > 0;
  //   //   },
  //   //   message: 'At least one instruments must be selected',
  //   // },
  // },
  // tempo: {
  //   type: String,
  //   // required: [true, 'Tempo must be selected'],
  // },
  // key: {
  //   type: String,
  //   // required: [true, 'Key must be selected'],
  // },
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

const PromptModel = mongoose.model('Prompt', promptSchema);
module.exports = PromptModel;
