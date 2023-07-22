const jwt = require('jsonwebtoken');

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;

        console.log('token: ' + token);

        const decode = token?.split(' ')[1];
        if (token) {
            jwt.verify(decode, process.env.JWT_KEY_TOKEN, (err, data) => {
                if (err) {
                    return res.status(403).json({ message: 'Token is invalid' });
                }
                req.data = data;
                next();
            });
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    },

    verifyTokenRoleAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.data?.id === req.params.id || req.data?.role === 'admin') {
                next();
            } else {
                return res.status(401).json({ message: 'You are not allowed to delete other' });
            }
        });
    },
};

module.exports = middlewareController;
