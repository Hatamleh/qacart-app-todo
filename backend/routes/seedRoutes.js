import express from "express";
import data from "../data.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Task.deleteMany({});
  const createdTasks = await Task.insertMany(data.tasks);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdTasks, createdUsers });
});

export default seedRouter;
