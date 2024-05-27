import Joi from 'joi';

const refreshToken = Joi.object({
    userId: Joi.string().email().required(),
    rt: Joi.string().required(),
  });

export default refreshToken