const Joi = require('@hapi/joi');

const validate = async (data) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().max(1024).required(),
        password: Joi.string().min(4).max(255).required(),
        password2: Joi.any().valid(Joi.ref('password')).required().label('confirm password')
            .messages({
                'any.only': 'passwords do not match',
            }),
        firstName: Joi.string().max(255).required(),
        lastName: Joi.string().max(255).required(),
    });

    return await schema.validate(data, {abortEarly: false});
};



module.exports = validate;
