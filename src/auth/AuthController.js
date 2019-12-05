const jwt = require('jsonwebtoken');
const User = require('../user/UserSchema');
const ApiError = require('../util/ApiError');
const bcrypt = require("bcrypt");

/*  @POST /auth/login/
 *  ACCESS public
 *  Handle User Login */
const signIn = async (req, res) => {
    //validate user
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).json(ApiError({
            status: 400,
            type: 'notFound',
            message: 'Email or Password is invalid'
        }));

        const isCorrectPassword = bcrypt.compareSync(req.body.password , user.password);

        if (!isCorrectPassword)
            return res.status(400).json(ApiError({
                status: 400,
                type: 'notFound',
                message: 'Email or Password is invalid'
            }));

        // create the jwt token
        const token = jwt.sign(
            {
                _id: user._id,
                firstName: user.firstName,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 10,
            }
        );

        //return the token
        return res.json({
            token
        })

    }catch (error) {
        return res.status(500).json(ApiError({
            status: 500,
            type: 'serverError',
            message: 'Internal Server Error'
        }))
    }

};

module.exports = {
    signIn,
};