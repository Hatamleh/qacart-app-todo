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
  ],
  tasks: [],
};

export default data;
