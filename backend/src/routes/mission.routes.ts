import express from 'express';
import { getMissions, completeMission } from '../controllers/mission.controllers';
import { accessTokenValidator } from '../middlewares/users.middlewares';

const router = express.Router();

router.get('/', getMissions);
router.post('/complete', accessTokenValidator, completeMission);

export default router;