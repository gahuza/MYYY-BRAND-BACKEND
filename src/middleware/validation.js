import  Joi  from '@hapi/joi';


const userCreationSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(8),
  });
  const commentsSchema = Joi.object({
    comment: Joi.string().min(3).max(100).required(),
  });

  export {
    userCreationSchema,
    commentsSchema,
  };