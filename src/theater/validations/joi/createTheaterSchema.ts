import Joi from 'joi';

const createTheaterSchema = Joi.object({
    id: Joi.string().email().required(),
    name: Joi.string().required(),
    location: Joi.string().required(),
    seatingCapacity: Joi.number().required(),
});

export default createTheaterSchema

