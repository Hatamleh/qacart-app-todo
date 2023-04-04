import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Hatem",
      email: "hatem@example.com",
      password: bcrypt.hashSync("Test1234"),
    },
    {
      firstName: "Nuri",
      email: "nuri@example.com",
      password: bcrypt.hashSync("Test1234"),
    },
  ],
  tasks: [],
};

export default data;
