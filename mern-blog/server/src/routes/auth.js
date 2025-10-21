import { Router } from 'express';
import User from '../models/User.js';
import { validate } from '../middleware/validate.js';
import { authLoginSchema, authRegisterSchema } from './schemas.js';
import { signJwt } from '../utils/jwt.js';

const router = Router();

router.post('/register', validate(authRegisterSchema), async (req, res) => {
    const { email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const user = new User({ email });
    await user.setPassword(password);
    await user.save();
    const token = signJwt({ uid: user._id, email });
    res.status(201).json({ token });
});

router.post('/login', validate(authLoginSchema), async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = signJwt({ uid: user._id, email });
    res.json({ token });
});

export default router;
