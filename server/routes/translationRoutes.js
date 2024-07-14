// routes/translationRoutes.js
const express = require('express');
const { saveTranslation, getTranslations, clearTranslations } = require('../controllers/translationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/save', authMiddleware, saveTranslation);
router.get('/history', authMiddleware, getTranslations);
router.delete('/clear', authMiddleware, clearTranslations);

module.exports = router;
