import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  item: {
    type: String,
    min: 3,
  },
  isCompleted: {
    type: Boolean,
    min: 3,
    default: false,
  },
  userID: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", TaskSchema);
export default Task;
