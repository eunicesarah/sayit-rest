import Joi from 'joi';

const jLoginReq = Joi.object({
    psikolog_email: Joi.string().email().required(),
    psikolog_password: Joi.string().required(),
    });

const jLoginRes = Joi.object({
        token: Joi.string().required(),
    });

const jRegisterReq = Joi.object({
    psikolog_email: Joi.string().email().required(),
    psikolog_password: Joi.string().required(),
    psikolog_name: Joi.string().required(),
    psikolog_phone: Joi.string().required(),
    psikolog_klinik: Joi.string().required(),
    });

const jRegisterRes = Joi.object({
        token: Joi.string().required(),
    });

export { jLoginReq, jLoginRes, jRegisterReq, jRegisterRes };