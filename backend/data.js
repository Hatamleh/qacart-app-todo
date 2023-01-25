import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Hatem",
      email: "hatem@example.com",
      password: bcrypt.hashSync("123456"),
    },
    {
      firstName: "John",
      email: "john@example.com",
      password: bcrypt.hashSync("123456"),
    },
    {
			name: 'Ahmad',
			email: 'admin@example.com',
			password: bcrypt.hashSync('123456'),
			isAdmin: true,
		},
		{
			name: 'Rana',
			email: 'user@example.com',
			password: bcrypt.hashSync('123456'),
			isAdmin: false,
		},
  ],
  tasks: [],
};

export default data;
