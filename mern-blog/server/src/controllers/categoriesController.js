import Category from '../models/Category.js';

export const listCategories = async (req, res) => {
    const items = await Category.find({}).sort({ name: 1 });
    res.json(items);
};

export const createCategory = async (req, res) => {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
};
