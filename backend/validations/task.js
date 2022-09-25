import joi from "joi";

const TaskSchema = joi.object({
  item: joi.string().min(3).required(),
  isCompleted: joi.boolean().required(),
});

export { TaskSchema };
