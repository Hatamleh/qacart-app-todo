import express from 'express';
const router = express.Router();

const courses = [
	{
		id: 1,
		author: {
			name: 'Hatem Hatamleh',
			country: 'Jordan',
			yearsOfExperience: 13,
		},
		name: 'Selenium',
		type: 'WEB',
		language: 'JAVA',
	},
	{
		id: 2,
		author: {
			name: 'Hatem Hatamleh',
			country: 'Jordan',
			yearsOfExperience: 13,
		},
		name: 'ISTQB Foundation Level',
		type: 'MANUAL',
		language: 'NONE',
	},
];

router.get('/', async (req, res) => {
	return res.status(200).json({
		courses,
	});
});

router.get('/:id', async (req, res) => {
	const taskID = req.params.id;
	try {
		const targetedTask = await Task.findById(taskID);
		if (!targetedTask) {
			return res.status(400).json({
				message: 'We could not find the task in our database',
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
