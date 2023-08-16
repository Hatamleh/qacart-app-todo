import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authenticateToken from './middlewares/auth.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

//Import Routes
import UserRoutes from './routes/users.js';
import TaskRoutes from './routes/tasks.js';
import seedRouter from './routes/seedRoutes.js';
import infoRouter from './routes/info.js';
import coursesRouter from './routes/courses.js';
import studentsRoute from './routes/students.js';

const __dirname = path.resolve();

// App Port
const port = process.env.PORT || 8080;

//Connect to DB
try {
	mongoose.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => {
			console.log('DataBase is up and running');
		}
	);
} catch (err) {
	console.log('Something went wrong, cant connect to database');
}

// MiddleWears
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/frontend/build')));

// Use Routes
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/students', studentsRoute);
app.use('/api/v1/tasks', authenticateToken, TaskRoutes);
app.use('/api/v1/courses', authenticateToken, coursesRouter);
app.use('/api/v1/clear', authenticateToken, seedRouter);
app.use('/api/v1/info', infoRouter);

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
	res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});
