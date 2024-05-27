import Joi from 'joi';

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });

export default signupSchema