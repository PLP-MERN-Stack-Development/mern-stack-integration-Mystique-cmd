import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { postCreateSchema, postUpdateSchema } from './schemas.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { upload } from '../utils/upload.js';
import { listPosts, getPost, createPost, updatePost, deletePost } from '../controllers/postsController.js';

const router = Router();

router.get('/', asyncHandler(listPosts));
router.get('/:id', asyncHandler(getPost));
router.post('/', validate(postCreateSchema), asyncHandler(createPost));
router.put('/:id', validate(postUpdateSchema), asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

// image upload endpoint (returns filename)
router.post('/upload', upload.single('image'), (req, res) => {
    res.status(201).json({ filename: req.file.filename, url: `/uploads/${req.file.filename}` });
});

export default router;
