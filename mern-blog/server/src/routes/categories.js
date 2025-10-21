import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { categoryCreateSchema } from './schemas.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { listCategories, createCategory } from '../controllers/categoriesController.js';

const router = Router();
router.get('/', asyncHandler(listCategories));
router.post('/', validate(categoryCreateSchema), asyncHandler(createCategory));
export default router;
