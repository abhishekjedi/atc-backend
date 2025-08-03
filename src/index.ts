import express from 'express';
import cors from 'cors';
import router from './router';
import { connectRabbitMQ } from './utils/rabbimq';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectRabbitMQ();
    console.log('RabbitMQ connected');

    app.use(cors());
    app.use(express.json());

    app.use('/', router);

    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Uncaught Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
