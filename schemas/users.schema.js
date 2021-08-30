'use strict';
const Joi = require('joi');

const schemaUsers = Joi.object({
    id: Joi.number().integer().positive().required(),
    email: Joi.string().required().max(100),
    first_name: Joi.string().required().max(250),
    last_name: Joi.string().required().max(250),
    avatar: Joi.string().required().max(250)
}).optional();

module.exports = { schemaUsers }