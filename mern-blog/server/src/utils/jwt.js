import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'devsecret';

export const signJwt = (payload, options = {}) =>
    jwt.sign(payload, SECRET, { expiresIn: '7d', ...options });

export const verifyJwt = (token) =>
    jwt.verify(token, SECRET);
