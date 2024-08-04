import express from 'express';
import { SERVER_PORT } from './constants/index.js';

const app = express();
const PORT = SERVER_PORT;

// Health check endpoint
app.get('/', (req, res) => {
  res.send("Hello, I'm ok!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
