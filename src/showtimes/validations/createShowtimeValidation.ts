import Joi from 'joi';

const createShowtimeSchema = Joi.object({
    movieId: Joi.string().required(),
    theaterId: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
  });

export default createShowtimeSchema