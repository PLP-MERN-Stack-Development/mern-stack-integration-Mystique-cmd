import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernblog';

(async () => {
    try {
        await connectDB(mongoUri);
    } catch (err) {
        console.error('DB connection failed:', err?.message || err);
        console.error('Continuing to start server without DB connection. Some routes may not work.');
    }
    const start = (p) => app.listen(p, () => console.log(`Server on http://localhost:${p}`));
    let server = start(port);
    server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE') {
            const fallback = Number(port) + 1;
            console.warn(`Port ${port} in use, trying ${fallback}...`);
            server = start(fallback);
            server.on('error', (err2) => {
                if (err2 && err2.code === 'EADDRINUSE') {
                    console.warn(`Port ${fallback} also in use, falling back to random available port...`);
                    server = start(0);
                } else {
                    throw err2;
                }
            });
        } else {
            throw err;
        }
    });
})();
