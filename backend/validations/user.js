import joi from 'joi';

const signupSchema = joi.object({
	firstName: joi.string().min(2).required(),
	lastName: joi.string().min(2).required(),
	email: joi
		.string()
		.email()
		.min(7)
		.required()
		.regex(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		),
	password: joi.string().min(8).required(),
});

const loginSchema = joi.object({
	email: joi.string().email().min(7).required(),
	password: joi.string().min(8).required(),
});

export { signupSchema, loginSchema };
