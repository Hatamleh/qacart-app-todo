import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "Hatem",
      email: "hatem@example.com",
      password: bcrypt.hashSync("Test123"),
    },
    {
      firstName: "Nuri",
      email: "nuri@example.com",
      password: bcrypt.hashSync("Test123"),
    },
  ],
  tasks: [],
};

export default data;
