const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
})

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email
    },
        process.env.JWT_SECRET_KEY, {
        expiresIn: "3h"
    })

    return token;
}

const validateUser = user => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255)
    })

    return schema.validate(user)
}

exports.User = model('user', userSchema)
exports.validate = validateUser;