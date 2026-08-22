// src/routes/questionnaire.js

const express = require('express');
const { submitQuestionnaire } = require('../controllers/questionnaireController');
const { authMiddleware } = require('../middleware/auth');
const { validateQuestionnaire } = require('../middleware/validation');

const router = express.Router();

router.post('/submit', authMiddleware, validateQuestionnaire, submitQuestionnaire);

module.exports = router;
