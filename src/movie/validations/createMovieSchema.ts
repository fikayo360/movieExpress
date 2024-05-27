import Joi from 'joi';

const createMovieSchema = Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    duration: Joi.number().required(),
    rating: Joi.number().required(),
    posterimg: Joi.string().required(),
    expiryDate:Joi.date().required(),
    theaterId: Joi.string().required()
});

export default createMovieSchema