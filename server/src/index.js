import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import { SERVER_PORT } from './constants/constants.js';
import dbConnect from './utils/db-connection.js';
import { httpLogger } from './middleware/logger.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = SERVER_PORT;
const corsOptions = {
  origin: process.env.NODE_ENV, // Specify your frontend URL
  credentials: true // Allow cookies to be sent
};

app.use(httpLogger);
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Health check endpoint
app.get('/', (req, res) => {
  res.send("Hello, I'm ok!");
});

app.use('/api', router);

// Start the server
const startServer = async () => {
  try {
    const dbConnection = await dbConnect();
    if (dbConnection === true) {
      try {
        app.listen(PORT, () => {
          console.info(`🚀 Server is running on port ${PORT}`);
        });
      } catch (error) {
        console.error('❌ Cannot start the server: ', error);
      }
    }
  } catch (error) {
    console.error('❌ Cannot start the server: ', error);
  }
};

startServer();
