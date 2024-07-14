// controllers/translationController.js
const Translation = require('../models/Translation');

exports.saveTranslation = async (req, res) => {
  const { originalText, translatedText } = req.body;
  try {
    const newTranslation = new Translation({
      userId: req.user,
      originalText,
      translatedText
    });
    await newTranslation.save();
    res.json({ msg: 'Translation saved successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTranslations = async (req, res) => {
  try {
    const translations = await Translation.find({ userId: req.user }).sort({ date: -1 });
    res.json(translations);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.clearTranslations = async (req, res) => {
  try {
    await Translation.deleteMany({ userId: req.user });
    res.json({ msg: 'Translation history cleared successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
