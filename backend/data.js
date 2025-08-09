import bcrypt from 'bcryptjs';

// Test
const data = {
	users: [
		{
			firstName: 'Hatem',
			email: 'hatem@example.com',
			password: bcrypt.hashSync('Test1234'),
		},
	],
	tasks: [],
};

export default data;
