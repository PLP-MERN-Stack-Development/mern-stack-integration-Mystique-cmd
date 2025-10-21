import Post from '../models/Post.js';

export const listPosts = async (req, res) => {
    const { page = 1, limit = 10, q, category } = req.query;
    const filter = {};
    if (q) filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
    ];
    if (category) filter.categories = category;

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
        Post.find(filter).populate('categories').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        Post.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
};

export const getPost = async (req, res) => {
    const item = await Post.findById(req.params.id).populate('categories');
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
};

export const createPost = async (req, res) => {
    const post = await Post.create(req.body);
    res.status(201).json(post);
};

export const updatePost = async (req, res) => {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
};

export const deletePost = async (req, res) => {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).end();
};
