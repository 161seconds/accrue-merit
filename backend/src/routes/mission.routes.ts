const express = require('express');
const router = express.Router();
const { getMissions, completeMission } = require('../controllers/mission.controllers');

router.get('/', getMissions);
router.post('/complete', completeMission);

export default router;