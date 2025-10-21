import Joi from 'joi';

export const postCreateSchema = Joi.object({
    title: Joi.string().min(3).max(120).required(),
    slug: Joi.string().regex(/^[a-z0-9-]+$/).required(),
    content: Joi.string().min(10).required(),
    categories: Joi.array().items(Joi.string().hex().length(24)).default([]),
    featuredImage: Joi.string().optional().allow(''),
});

export const postUpdateSchema = postCreateSchema.fork(['title','slug','content'], (f) => f.optional());

export const categoryCreateSchema = Joi.object({
    name: Joi.string().min(2).max(60).required(),
    slug: Joi.string().regex(/^[a-z0-9-]+$/).required(),
});

export const authRegisterSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

export const authLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});
