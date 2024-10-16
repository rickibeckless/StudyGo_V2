import express from 'express';
import { getUnits, addUnit, getUnitsByClassId, getUnitById, getTopicById } from '../controllers/unitsControllers.js';

const router = express.Router();

// /api/units

router.get('/', getUnits);
router.post('/:subjectId/:classId/new', addUnit);
router.get('/:subjectId/:classId', getUnitsByClassId);
router.get('/:subjectId/:classId/:unitId', getUnitById);
router.get('/:subjectId/:classId/:unitId/:topicId', getTopicById);

export default router;