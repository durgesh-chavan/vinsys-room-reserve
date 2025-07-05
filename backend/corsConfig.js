// CORS middleware for allowing frontend S3 bucket to access backend
import cors from 'cors';

const allowedOrigins = [
    '*',
    'http://localhost',
    'http://127.0.0.1'
    // or your EC2 public IP/domain if accessed directly
];

const corsOptions = {
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        // Allow all origins in development, restrict in production
        if (process.env.NODE_ENV === 'production') {
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error('Not allowed by CORS'));
            }
        } else {
            // In development, allow all origins
            return callback(null, true);
        }
    },
    credentials: true
};

export default corsOptions;
