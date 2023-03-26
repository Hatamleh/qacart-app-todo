import express from 'express';

const infoRouter = express.Router();

const courses = [
	{
		id: 1,
		author: 'Hatem Hatamleh',
		name: 'Selenium',
		type: 'WEB',
		language: 'JAVA',
	},
	{
		id: 2,
		author: 'Hatem Hatamleh',
		name: 'ISTQB Foundation Level',
		type: 'MANUAL',
		language: 'NONE',
	},
];

const lectures = [
	{
		id: 1,
		name: 'Selenium Introduction',
		type: 'FREE',
		mode: 'VIDEO',
	},
	{
		id: 2,
		name: 'Selenium Architecture',
		type: 'PAID',
		mode: 'VIDEO',
	},
	{
		id: 3,
		name: 'Install Java',
		type: 'PAID',
		mode: 'VIDEO',
	},
	{
		id: 4,
		name: 'WebDriver Manager',
		type: 'PAID',
		mode: 'ARTICLE',
	},
	{
		id: 5,
		name: 'Introduction to ISTQB',
		type: 'PAID',
		mode: 'VIDEO',
	},
	{
		id: 6,
		name: 'What is testing',
		type: 'PAID',
		mode: 'VIDEO',
	},
];

const technology = {
	frontend: {
		language: 'JAVASCRIPT',
		tools: ['REACT', 'AXIOS'],
		pages: 4,
	},
	backend: {
		language: 'JAVASCRIPT',
		tools: ['EXPRESS', 'bcryptjs', 'dotenv'],
		apis: 13,
	},
};

infoRouter.get('/courses', (req, res) => {
	const { type, language } = req.headers;

	if (type && language) {
		const flCourses = courses.filter(
			(course) => course.type === type && course.language === language
		);
		return res.status(200).json({
			courses: flCourses,
			count: flCourses.length,
		});
	}

	if (type) {
		const flCourses = courses.filter((course) => course.type === type);
		return res.status(200).json({
			courses: flCourses,
			count: flCourses.length,
		});
	}

	if (language) {
		const flCourses = courses.filter((course) => course.language === language);
		return res.status(200).json({
			courses: flCourses,
			count: flCourses.length,
		});
	}

	return res.status(200).json({
		courses,
		count: courses.length,
	});
});

infoRouter.get('/lectures', (req, res) => {
	const type = req.query.type;
	const mode = req.query.mode;
	console.log(type, mode);
	if (type && mode) {
		const flCourses = lectures.filter(
			(lecture) => lecture.mode === mode && lecture.type === type
		);
		return res.status(200).json({
			lectures: flCourses,
			count: flCourses.length,
		});
	}

	if (type) {
		const flCourses = lectures.filter((lecture) => lecture.type === type);
		return res.status(200).json({
			lectures: flCourses,
			count: flCourses.length,
		});
	}

	if (mode) {
		console.log('I am here');
		const flCourses = lectures.filter((lecture) => lecture.mode === mode);
		return res.status(200).json({
			lectures: flCourses,
			count: flCourses.length,
		});
	}
	return res.status(200).json({
		lectures,
		count: lectures.length,
	});
});

infoRouter.get('/', (req, res) => {
	const type = req.query.type;
	console.log(type);

	if (type === 'frontend') {
		return res.status(200).json({
			frontend: technology[type],
		});
	}

	if (type === 'backend') {
		return res.status(200).json({
			backend: technology[type],
		});
	}

	return res.status(200).json({
		technology,
	});
});

export default infoRouter;
