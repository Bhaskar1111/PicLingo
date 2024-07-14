// models/Translation.js
const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalText: {
    type: String,
    required: true
  },
  translatedText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Translation', TranslationSchema);
