import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRouter.js';
import aiRouter from './routes/aiRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Resume Builder Server is running');
});
// Import and use user routes
app.use('/api/users', userRoutes);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});