import Joi from 'joi';

const createTheaterSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    seatingCapacity: Joi.number().required(),
});

export default createTheaterSchema

