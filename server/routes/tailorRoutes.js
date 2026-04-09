import express from 'express';
import {
  createTailor,
  getTailors,
  getTailorById,
  updateTailor,
  deleteTailor
} from '../controllers/tailorController.js';

const router = express.Router();

router.post('/', createTailor);
router.get('/', getTailors);
router.get('/:id', getTailorById);
router.put('/:id', updateTailor);
router.delete('/:id', deleteTailor);

export default router;
