import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
});

export const updateTaskStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'completed').required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'completed'),
});
