import * as Joi from 'joi';

export default Joi.object({
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_TYPE: Joi.string().default('postgres'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.number().valid(0, 1).required(),
});
