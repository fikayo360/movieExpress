import Joi from 'joi';

const createShowtimeSchema = Joi.object({
    movieId: Joi.string().email().required(),
    theaterId: Joi.string().required(),
    startTime: Joi.string().min(4).required(),
    endTime: Joi.string().min(4).required(),
  });

export default createShowtimeSchema