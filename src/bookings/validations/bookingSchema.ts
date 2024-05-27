import Joi from 'joi';

const createBookingSchema = Joi.object({
    id:Joi.string().required(),
    userId:Joi.string().required(),
    theaterId: Joi.string().required(),
    seatNumber: Joi.string().required(),
    availability: Joi.string().min(4).required(),
    showtimeId: Joi.string().required()
  });

export default createBookingSchema