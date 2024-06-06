import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().alphanum().length(13).required(),
    publicationDate: Joi.date().required(),
    genre: Joi.string().optional(),
    description: Joi.string().max(500).optional(),
});

export const authorSchema = Joi.object({
    name: Joi.string().required(),
    bio: Joi.string().max(1000).optional(),
});
