import Joi from 'joi';

const updateMovieSchema = Joi.object({
    title: Joi.string(),
    genre: Joi.string(),
    duration: Joi.number(),
    rating: Joi.number(),
    posterimg: Joi.string(),
    expiryDate:Joi.date(),
    theaterId: Joi.string()
});

export default updateMovieSchema