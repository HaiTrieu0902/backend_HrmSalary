const UserModel = require('../models/User');
const userController = {
    /* get all user */
    getAllUSer: async (req, res, next) => {
        try {
            const users = await UserModel.find({}, 'username email role '); //-_id
            res.status(200).json({
                status: 200,
                message: 'Get all users successfully',
                data: users,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    /* getDetailUser */
    getDetailUser: async (req, res, next) => {
        try {
            const idUser = req.params.id;
            UserModel.findById(idUser, 'username email role')
                .then((data) => {
                    res.status(200).json({
                        message: 'get user success',
                        status: 200,
                        data: data,
                    });
                })
                .catch((err) => {
                    res.status(404).json('Not Found');
                });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteUsers: async (req, res, next) => {
        try {
            const user = await UserModel.findById(req.params.id);

            if (user) {
                UserModel.deleteOne({ _id: req.params.id })
                    .then((data) => {
                        res.status(200).json('Delete successful');
                    })
                    .catch((err) => {
                        res.status(500).json('Delete failed');
                    });
            } else {
                res.status(500).json('Not found ID');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = userController;
