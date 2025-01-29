const user = require("./../db/models/user");



const signup = async (req, res, next) => {
    const body = req.body;

    if (!['1', '2'].includes(body.userType)) {
        // throw new AppError('Invalid user Type', 400);
        return res.status(400).json({
            status: 'Failed',
            message: 'Failed to create the user',
        });
    }

    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
    });

    if (!newUser) {
        // return next(new AppError('Failed to create the user', 400));
        return res.status(400).json({
            status: 'Failed',    
            message: 'Failed to create the user',
        });
    }

    const result = newUser.toJSON();

    // delete result.password;
    // delete result.deletedAt;

    // result.token = generateToken({
    //     id: result.id,
    // });

    return res.status(201).json({
        status: 'success',
        data: newUser,
    });
};

module.exports = {
    signup
}
