import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        content: { type: String, required: true },
        featuredImage: { type: String }, // filename or URL
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if you add auth
    },
    { timestamps: true }
);

export default mongoose.model('Post', postSchema);
