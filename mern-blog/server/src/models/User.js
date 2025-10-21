import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        passwordHash: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.methods.setPassword = async function (pwd) {
    this.passwordHash = await bcrypt.hash(pwd, 12);
};

userSchema.methods.comparePassword = function (pwd) {
    return bcrypt.compare(pwd, this.passwordHash);
};

export default mongoose.model('User', userSchema);
