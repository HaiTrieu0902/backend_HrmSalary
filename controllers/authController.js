const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    // Register
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            /* Create new uSer*/
            const newUser = await new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                role: req.body.role,
            });
            const user = await newUser.save();
            res.status(200).json({
                status: 200,
                message: 'User register successfully',
                data: {
                    username: user?.username,
                    email: user?.email,
                },
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Login
    login: async (req, res) => {
        try {
            const user = await UserModel.findOne({ username: req.body.username });
            const validatePassword = await bcrypt.compare(req.body.password, user?.password);
            if (!user) {
                return res.status(404).json('Not found user name');
            }
            if (!validatePassword) {
                return res.status(404).json('Password is wrong');
            }
            if (user && validatePassword) {
                /* token : Không chưa thời gian có hạn, nếu set thì token trở nên ngắn hạn phù hợp với (Ngân hàng,Giáo dục...) */
                const token = jwt.sign(
                    { id: user._id, username: user?.username, role: user?.role },
                    process.env.JWT_KEY_TOKEN,
                    { expiresIn: '2h' },
                );

                /* create cookies: ngăn chặn tấn công  */
                res.cookie('access_token', token, {
                    httpOnly: true,
                    // secure: false,
                    path: '/',
                    sameSized: 'strict',
                });
                res.status(200).json({
                    status: 200,
                    message: 'Login successfully',
                    data: {
                        username: user?.username,
                        email: user?.email,
                        token: token,
                    },
                });
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Error: Username not exits' });
        }
    },

    /* Logout*/
    logout: async (req, res) => {
        try {
            res.clearCookie('access_token');
            res.status(200).json({ message: 'Logged out' });
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = authController;
