// file: src/index.ts

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Recommended for frontend-backend separation
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';

// 1. Configuration & Environment Setup
dotenv.config();

// 2. App Initialization
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Global Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Set a specific origin in production!
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Basic Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// 4. Routes
// Mount the authentication routes
app.use('/api/v1/auth', authRoutes);

// Mount the protected dashboard routes
app.use('/api/v1', dashboardRoutes);


// 5. Server Start
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});