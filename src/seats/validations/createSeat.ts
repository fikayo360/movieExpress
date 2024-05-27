import Joi from 'joi';

const createSeatSchema = Joi.object({
    theaterId: Joi.string().email().required(),
    seatNumber: Joi.string().required(),
    availability: Joi.string().min(4).required(),
    showtimeId: Joi.string().required()
  });

export default createSeatSchema