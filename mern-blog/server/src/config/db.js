import mongoose from 'mongoose';

let memoryServer = null;

export async function connectDB(uri) {
    mongoose.set('strictQuery', true);
    const opts = { serverSelectionTimeoutMS: 3000 };
    try {
        await mongoose.connect(uri, opts);
        console.log('MongoDB connected:', uri);
        return mongoose.connection;
    } catch (err) {
        console.warn('Primary MongoDB connection failed:', err?.message || err);
        if (process.env.USE_MEMORY_DB === 'false') throw err;
        try {
            const { MongoMemoryServer } = await import('mongodb-memory-server');
            memoryServer = await MongoMemoryServer.create();
            const memUri = memoryServer.getUri('mernblog');
            await mongoose.connect(memUri, opts);
            console.log('MongoDB (in-memory) connected');
            return mongoose.connection;
        } catch (memErr) {
            console.error('Failed to start in-memory MongoDB:', memErr?.message || memErr);
            throw err; // rethrow original error
        }
    }
}

export async function disconnectDB() {
    await mongoose.disconnect().catch(() => {});
    if (memoryServer) {
        try { await memoryServer.stop(); } catch {}
        memoryServer = null;
    }
}
