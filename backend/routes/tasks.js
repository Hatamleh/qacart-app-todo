import express from 'express';
import { TaskSchema } from '../validations/task.js';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const userID = req.user.id;
	try {
		const allTasks = await Task.find({ userID: userID });
		return res.status(200).send({ tasks: allTasks });
	} catch {
		return res.status(500).json({
			message: 'Something went wrong, please try again',
		});
	}
});

router.get('/:id', async (req, res) => {
	const taskID = req.params.id;
	const userID = req.user.id;
	try {
		const targetedTask = await Task.findById(taskID);
		if (!targetedTask) {
			return res.status(404).json({
				message: 'We could not find the task in our database',
			});
		}
		if (targetedTask.userID !== userID) {
			return res.status(403).json({
				message: 'You are forbidden to access this data',
			});
		}
		return res.status(200).send(targetedTask);
	} catch {
		res.status(500).json({
			message: 'Something went wrong, please try again',
		});
	}
});

router.post('/', async (req, res) => {
	const userID = req.user.id;
	const { error } = await TaskSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const newTask = await new Task({
		item: req.body.item,
		userID: userID,
	});
	try {
		const savedTask = await newTask.save();
		return res.status(201).send(savedTask);
	} catch {
		res.status(500).json({
			message: 'Something went wrong, please try again',
		});
	}
});

router.put('/:id', async (req, res) => {
	const taskID = req.params.id;
	const { error } = await TaskSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	try {
		const updatedTask = await Task.findByIdAndUpdate(
			taskID,
			{
				isCompleted: req.body.isCompleted,
				item: req.body.item,
			},
			{ new: true }
		);
		if (!updatedTask) {
			return res.status(400).json({
				message: 'We could not find the task in our database',
			});
		}
		return res.status(200).send(updatedTask);
	} catch {
		res.status(500).json({
			message: 'Something went wrong, please try again',
		});
	}
});

router.delete('/:id', async (req, res) => {
	console.log(req.user);
	const taskID = req.params.id;
	try {
		const deletedTask = await Task.findByIdAndDelete(taskID);
		if (!deletedTask) {
			return res.status(400).json({
				message: 'We could not find the task in our database',
			});
		}
		return res.status(200).send(deletedTask);
	} catch {
		res.status(500).json({
			message: 'Something went wrong, please try again',
		});
	}
});

export default router;
