import Joi from 'joi';

const createSeatSchema = Joi.object({
    theaterId: Joi.string().required(),
    seatnumber: Joi.number().required(),
    showtimeId: Joi.string().required()
  });

export default createSeatSchema