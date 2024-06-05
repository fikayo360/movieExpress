import Joi from 'joi';

const createBookingSchema = Joi.object({
    userId:Joi.string().required(),
    totalPrice:Joi.number().required(),
    seatnumber: Joi.number().required(),
    showtimeId: Joi.string().required()
  });

export default createBookingSchema