import Joi from 'joi';

const jLoginReq = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    });

const jLoginRes = Joi.object({
        token: Joi.string().required(),
    });

export { jLoginReq, jLoginRes };